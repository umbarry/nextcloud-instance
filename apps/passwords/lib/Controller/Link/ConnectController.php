<?php
/*
 * @copyright 2024 Passwords App
 *
 * @author Marius David Wieschollek
 * @license AGPL-3.0
 *
 * This file is part of the Passwords App
 * created by Marius David Wieschollek.
 */

namespace OCA\Passwords\Controller\Link;

use Exception;
use OCA\Passwords\Db\Registration;
use OCA\Passwords\Helper\Settings\ServerSettingsHelper;
use OCA\Passwords\Helper\Token\ApiTokenHelper;
use OCA\Passwords\Services\EnvironmentService;
use OCA\Passwords\Services\LoggingService;
use OCA\Passwords\Services\MailService;
use OCA\Passwords\Services\NotificationService;
use OCA\Passwords\Services\Object\RegistrationService;
use OCA\Passwords\Services\SessionService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\AnonRateLimit;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\Attribute\PublicPage;
use OCP\AppFramework\Http\Attribute\UserRateLimit;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;
use Throwable;

/**
 * Class ConnectController
 *
 * @package OCA\Passwords\Controller\Link
 */
class ConnectController extends Controller {

    const PASSLINK_CONNECT_EXTENSION = "ext+passlink:%s/do/connect/%s";
    const PASSLINK_CONNECT_DOMAIN = "https://link.passwordsapp.org/open/%s/do/connect/%s";
    const PASSLINK_CONNECT_WEB = "web+passlink:%s/do/connect/%s";
    const PASSLINK_CONNECT_PROTOCOL = "passlink:%s/do/connect/%s";
    const SESSION_KEY = 'passlink.connect';

    /**
     * @var MailService
     */
    protected MailService $mails;

    /**
     * @var LoggingService
     */
    protected LoggingService $logger;

    /**
     * @var SessionService
     */
    protected SessionService $session;

    /**
     * @var ApiTokenHelper
     */
    protected ApiTokenHelper $tokenHelper;

    /**
     * @var EnvironmentService
     */
    protected EnvironmentService $environment;

    /**
     * @var NotificationService
     */
    protected NotificationService $notifications;

    /**
     * @var ServerSettingsHelper
     */
    protected ServerSettingsHelper $serverSettings;

    /**
     * @var RegistrationService
     */
    protected RegistrationService $registrationService;

    /**
     * ConnectController constructor.
     *
     * @param                      $appName
     * @param RegistrationService  $registrationService
     * @param ServerSettingsHelper $serverSettings
     * @param NotificationService  $notifications
     * @param EnvironmentService   $environment
     * @param ApiTokenHelper       $tokenHelper
     * @param SessionService       $session
     * @param LoggingService       $logger
     * @param MailService          $mails
     * @param IRequest             $request
     */
    public function __construct(
        $appName,
        RegistrationService $registrationService,
        ServerSettingsHelper $serverSettings,
        NotificationService $notifications,
        EnvironmentService $environment,
        ApiTokenHelper $tokenHelper,
        SessionService $session,
        LoggingService $logger,
        MailService $mails,
        IRequest $request
    ) {
        parent::__construct($appName, $request);
        $this->registrationService = $registrationService;
        $this->serverSettings      = $serverSettings;
        $this->notifications       = $notifications;
        $this->tokenHelper         = $tokenHelper;
        $this->environment         = $environment;
        $this->session             = $session;
        $this->logger              = $logger;
        $this->mails               = $mails;
    }

    /**
     * @param string|null $link
     *
     * @return JSONResponse
     * @throws \OCP\DB\Exception
     */
    #[NoCSRFRequired]
    #[NoAdminRequired]
    #[UserRateLimit(limit: 4, period: 60)]
    public function request(?string $link = 'protocol'): JSONResponse {
        $this->destroyCurrentRegistration();

        $registration = $this->registrationService->create();
        $this->registrationService->save($registration);
        $this->session->set(self::SESSION_KEY, $registration->getUuid());
        $this->session->save();

        $linkUrl = str_replace('https://', '', $this->serverSettings->get('baseUrl'));
        $links = [
            'web' => sprintf(self::PASSLINK_CONNECT_WEB, $linkUrl, $registration->getUuid()),
            'extension' => sprintf(self::PASSLINK_CONNECT_EXTENSION, $linkUrl, $registration->getUuid()),
            'domain' => sprintf(self::PASSLINK_CONNECT_DOMAIN, $linkUrl, $registration->getUuid()),
            'protocol' => sprintf(self::PASSLINK_CONNECT_PROTOCOL, $linkUrl, $registration->getUuid())
        ];

        $data = ['id' => $registration->getUuid(), 'links' => $links];
        if (!empty($link) && isset($links[$link])) {
            $data['link'] = $links[$link];
        }

        return new JSONResponse($data);
    }

    /**
     * @return JSONResponse
     */
    #[NoCSRFRequired]
    #[NoAdminRequired]
    public function await(): JSONResponse {
        $time  = 0;
        $limit = $this->getTimeLimit() * 4;
        while($time < $limit) {
            $registration = $this->getRegistrationFromSession();
            if($registration === null) {
                return new JSONResponse(['success' => false], Http::STATUS_NOT_FOUND);
            }

            if($registration->getStatus() === 1) {
                $time = $registration->getUpdated() + $registration->getLimit() - time() - 1;
                $data = [
                    'label' => $registration->getLabel(),
                    'time'  => $time,
                    'code'  => explode(',', $registration->getCode())
                ];

                return new JSONResponse($data);
            }

            usleep(250000);
            $time++;
        }

        $this->destroyCurrentRegistration();

        return new JSONResponse(['success' => false], Http::STATUS_FAILED_DEPENDENCY);
    }

    /**
     * @return JSONResponse
     * @throws \OCP\DB\Exception
     */
    #[NoCSRFRequired]
    #[NoAdminRequired]
    public function reject(): JSONResponse {
        $registration = $this->getRegistrationFromSession();
        if($registration === null || $registration->getStatus() !== 1) {
            return new JSONResponse(['success' => false], Http::STATUS_NOT_FOUND);
        }

        $registration->setStatus(3);
        $this->registrationService->save($registration);
        $this->session->unset(self::SESSION_KEY);
        $this->session->save();

        return new JSONResponse(['success' => true]);
    }

    /**
     * @param string|null $label
     *
     * @return JSONResponse
     */
    #[NoCSRFRequired]
    #[NoAdminRequired]
    public function confirm(string $label = null): JSONResponse {
        $registration = $this->getRegistrationFromSession();
        if($registration === null || $registration->getStatus() !== 1) {
            return new JSONResponse(['success' => false], Http::STATUS_NOT_FOUND);
        }

        $label = $this->validateLabel($label, $registration->getLabel());

        try {
            /** @var $deviceToken IToken */
            [$token, $deviceToken] = $this->tokenHelper->createToken($label, true);
        } catch(Throwable $e) {
            $this->logger->logException($e);

            return new JSONResponse(['success' => false], Http::STATUS_NOT_FOUND);
        }

        $registration->setStatus(2);
        $registration->setLogin($deviceToken->getLoginName());
        $registration->setToken($token);
        $this->registrationService->save($registration);
        $this->notifications->sendNewClientNotification($registration->getUserId(), $label);
        $this->mails->sendNewClientMail($registration->getUserId(), $label);

        return new JSONResponse(['success' => true]);
    }

    /**
     * @param string      $id
     * @param array       $codes
     * @param string|null $label
     *
     * @return JSONResponse
     * @throws Exception
     */
    #[PublicPage]
    #[NoCSRFRequired]
    #[NoAdminRequired]
    #[AnonRateLimit(limit: 3, period: 60)]
    public function apply(string $id, array $codes, string $label = null): JSONResponse {
        try {
            /** @var Registration $registration */
            $registration = $this->registrationService->findByUuid($id);
        } catch(Throwable $e) {
            $this->logger->logException($e);

            return new JSONResponse(['success' => false], Http::STATUS_NOT_FOUND);
        }

        if($registration->getStatus() !== 0) {
            return new JSONResponse(['success' => false], Http::STATUS_NOT_FOUND);
        }

        if(!$this->validateCodes($codes)) {
            return new JSONResponse(['success' => false], Http::STATUS_BAD_REQUEST);
        }

        $label = $this->validateLabel($label);

        try {
            $registration->setLimit($this->getTimeLimit());
            $registration->setStatus(1);
            $registration->setLabel($label);
            $registration->setCode(implode(',', $codes));
            $this->registrationService->save($registration);
        } catch(Throwable $e) {
            $this->logger->logException($e);

            return new JSONResponse(['success' => false], Http::STATUS_NOT_FOUND);
        }

        return $this->waitForConfirmation($id);
    }

    /**
     * @param string $id
     *
     * @return JSONResponse
     */
    #[PublicPage]
    #[NoCSRFRequired]
    #[NoAdminRequired]
    #[AnonRateLimit(limit: 3, period: 60)]
    public function theme(string $id): JSONResponse {
        try {
            /** @var Registration $registration */
            $registration = $this->registrationService->findByUuid($id);
        } catch(Throwable $e) {
            $this->logger->logException($e);

            return new JSONResponse(['success' => false], Http::STATUS_NOT_FOUND);
        }

        if($registration->getStatus() > 2) {
            return new JSONResponse(['success' => false], Http::STATUS_NOT_FOUND);
        }


        return new JSONResponse($this->getTheme());
    }

    /**
     * @return Registration|null
     */
    protected function getRegistrationFromSession(): ?Registration {
        if($this->session->has(self::SESSION_KEY)) {
            $id = $this->session->get(self::SESSION_KEY);

            $this->registrationService->clearCache();
            try {
                /** @var Registration $registration */
                $registration = $this->registrationService->findByUuid($id);
            } catch(Throwable $e) {
                $this->logger->logException($e);

                return null;
            }

            if($registration->getCreated() > time() - 121) {
                return $registration;
            }

            $this->destroyCurrentRegistration();
        }

        return null;
    }

    /**
     *
     */
    protected function destroyCurrentRegistration(): void {
        if($this->session->has(self::SESSION_KEY)) {
            $id = $this->session->get(self::SESSION_KEY);

            try {
                $registration = $this->registrationService->findByUuid($id);
                $this->registrationService->destroy($registration);
                $this->session->unset(self::SESSION_KEY);
                $this->session->save();
            } catch(Throwable $e) {
                $this->logger->logException($e);
            }
        }
    }

    /**
     * @return array
     */
    protected function getTheme(): array {
        return [
            'label' => $this->serverSettings->get('theme.label'),
            'logo' => $this->serverSettings->get('theme.logo'),
            'background' => $this->serverSettings->get('theme.background'),
            'colors' => [
                'primary' => $this->serverSettings->get('theme.color.primary'),
                'text' => $this->serverSettings->get('theme.color.text'),
                'background' => $this->serverSettings->get('theme.color.background')
            ]
        ];
    }

    /**
     * @param array $code
     *
     * @return bool
     */
    protected function validateCodes(array $code): bool {
        $code = array_unique(array_map('trim', $code));

        if(count($code) < 3 || count($code) > 4) {
            return false;
        }

        foreach($code as $value) {
            if(mb_strlen($value) < 4 || mb_strlen($value) > 6 || !preg_match('/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])\S*$/', $value)) {
                return false;
            }
        }

        return true;
    }

    /**
     * @param string|null $label
     * @param string|null $fallback
     *
     * @return string
     */
    protected function validateLabel(?string $label, ?string $fallback = null): string {
        $label = $label === null ? '':trim($label);

        if(empty($label) ||
           in_array($label, $this->environment->getProtectedClients()) ||
           strpos($label, 'Passwords Session') !== false ||
           !preg_match('/^[\w\s-]{12,64}$/', $label)) {
            return $fallback === null ? $this->environment->getUserAgent():$fallback;
        }

        if(strlen($label) > 256) return substr($label, 0, 256);

        return $label;
    }

    /**
     * @param string $id
     *
     * @return JSONResponse
     * @throws Exception
     */
    protected function waitForConfirmation(string $id): JSONResponse {
        $time  = 0;
        $limit = $this->getTimeLimit() * 4;
        while($time < $limit) {
            $this->registrationService->clearCache();
            try {
                /** @var Registration $registration */
                $registration = $this->registrationService->findByUuid($id);
            } catch(Throwable $e) {
                $this->logger->logException($e);

                return new JSONResponse(['success' => false], Http::STATUS_NOT_FOUND);
            }

            if($registration->getStatus() === 2) {
                $data = [
                    'success' => true,
                    'login'   => $registration->getLogin(),
                    'token'   => $registration->getToken()
                ];
                try {
                    $this->registrationService->destroy($registration);
                } catch(Exception $e) {
                }

                return new JSONResponse($data);
            } else if($registration->getStatus() === 3) {
                $this->registrationService->destroy($registration);
                break;
            }

            usleep(250000);
            $time++;
        }

        return new JSONResponse(['success' => false], Http::STATUS_FAILED_DEPENDENCY);
    }

    /**
     * @return int
     */
    protected function getTimeLimit(): int {
        set_time_limit(0);
        $maxExecutionTime = intval(ini_get('max_execution_time'));

        return $maxExecutionTime === 0 || $maxExecutionTime > 59 ? 59:$maxExecutionTime - 1;
    }
}