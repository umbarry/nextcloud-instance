<?php
/**
 * This file is part of the Passwords App
 * created by Marius David Wieschollek
 * and licensed under the AGPL.
 */

namespace OCA\Passwords\Helper\AppSettings;

use OCA\Passwords\Exception\ApiException;
use OCA\Passwords\Fetcher\NightlyAppFetcher;
use OCA\Passwords\Services\BackgroundJobService;
use OCA\Passwords\Services\ConfigurationService;

/**
 * Class NightlySettingsHelper
 *
 * @package OCA\Passwords\Helper\AppSettings
 */
class NightlySettingsHelper extends AbstractSettingsHelper {

    /**
     * @var NightlyAppFetcher
     */
    protected NightlyAppFetcher $nightlyAppFetcher;

    /**
     * @var BackgroundJobService
     */
    protected BackgroundJobService $backgroundJobService;

    /**
     * @var string
     */
    protected string $scope = 'nightly';

    /**
     * @var array
     */
    protected array $keys
        = [
            'enabled' => 'nightly/enabled'
        ];

    /**
     * @var array
     */
    protected array $types
        = [
            'enabled' => 'boolean'
        ];

    /**
     * @var array
     */
    protected array $defaults
        = [
            'enabled' => false
        ];

    /**
     * NightlySettingsHelper constructor.
     *
     * @param ConfigurationService $config
     * @param NightlyAppFetcher    $nightlyAppFetcher
     * @param BackgroundJobService $backgroundJobService
     */
    public function __construct(ConfigurationService $config, NightlyAppFetcher $nightlyAppFetcher, BackgroundJobService $backgroundJobService) {
        parent::__construct($config);
        $this->nightlyAppFetcher    = $nightlyAppFetcher;
        $this->backgroundJobService = $backgroundJobService;
    }

    /**
     * @param string $key
     * @param        $value
     *
     * @return array
     * @throws ApiException
     */
    public function set(string $key, $value): array {

        $result = parent::set($key, $value);
        if($key === 'enabled') $this->setNightlyStatus($result['value']);

        return $result;
    }

    /**
     * @param $enabled
     */
    protected function setNightlyStatus($enabled): void {
        if($enabled) {
            $this->backgroundJobService->addNightlyUpdates();
            $this->nightlyAppFetcher->get();
        } else {
            $this->backgroundJobService->removeNightlyUpdates();
            $this->nightlyAppFetcher->clearDb();
        }
    }
}