<?php
/*
 * @copyright 2022 Passwords App
 *
 * @author Marius David Wieschollek
 * @license AGPL-3.0
 *
 * This file is part of the Passwords App
 * created by Marius David Wieschollek.
 */

namespace OCA\Passwords\Helper\Backup;

use Exception;
use OCA\Passwords\Db\AbstractMapper;
use OCA\Passwords\Db\AbstractRevisionMapper;
use OCA\Passwords\Db\ChallengeMapper;
use OCA\Passwords\Db\FolderMapper;
use OCA\Passwords\Db\FolderRevisionMapper;
use OCA\Passwords\Db\KeychainMapper;
use OCA\Passwords\Db\Password;
use OCA\Passwords\Db\PasswordMapper;
use OCA\Passwords\Db\PasswordRevisionMapper;
use OCA\Passwords\Db\PasswordTagRelationMapper;
use OCA\Passwords\Db\ShareMapper;
use OCA\Passwords\Db\TagMapper;
use OCA\Passwords\Db\TagRevisionMapper;
use OCA\Passwords\Helper\Settings\UserSettingsHelper;
use OCA\Passwords\Services\AppSettingsService;
use OCA\Passwords\Services\ConfigurationService;
use OCA\Passwords\Services\UserChallengeService;

/**
 * Class CreateBackupHelper
 *
 * @package OCA\Passwords\Helper\Backup
 */
class CreateBackupHelper {

    const BACKUP_VERSION = 106;

    /**
     * @var ConfigurationService
     */
    protected ConfigurationService $config;

    /**
     * @var TagMapper
     */
    protected TagMapper $tagMapper;

    /**
     * @var FolderMapper
     */
    protected FolderMapper $folderMapper;

    /**
     * @var ShareMapper
     */
    protected ShareMapper $shareMapper;

    /**
     * @var PasswordMapper
     */
    protected PasswordMapper $passwordMapper;

    /**
     * @var KeychainMapper
     */
    protected KeychainMapper $keychainMapper;

    /**
     * @var ChallengeMapper
     */
    protected ChallengeMapper $challengeMapper;

    /**
     * @var TagRevisionMapper
     */
    protected TagRevisionMapper $tagRevisionMapper;

    /**
     * @var UserSettingsHelper
     */
    protected UserSettingsHelper $userSettingsHelper;

    /**
     * @var AppSettingsService
     */
    protected AppSettingsService $appSettingsService;

    /**
     * @var FolderRevisionMapper
     */
    protected FolderRevisionMapper $folderRevisionMapper;

    /**
     * @var PasswordRevisionMapper
     */
    protected PasswordRevisionMapper $passwordRevisionMapper;

    /**
     * @var PasswordTagRelationMapper
     */
    protected PasswordTagRelationMapper $passwordTagRelationMapper;

    /**
     * @var array
     */
    protected array $users = [];

    /**
     * CreateBackupHelper constructor.
     *
     * @param TagMapper                 $tagMapper
     * @param ShareMapper               $shareMapper
     * @param FolderMapper              $folderMapper
     * @param ConfigurationService      $config
     * @param PasswordMapper            $passwordMapper
     * @param KeychainMapper            $keychainMapper
     * @param ChallengeMapper           $challengeMapper
     * @param TagRevisionMapper         $tagRevisionMapper
     * @param UserSettingsHelper        $userSettingsHelper
     * @param AppSettingsService        $appSettingsService
     * @param FolderRevisionMapper      $folderRevisionMapper
     * @param PasswordRevisionMapper    $passwordRevisionMapper
     * @param PasswordTagRelationMapper $passwordTagRelationMapper
     */
    public function __construct(
        TagMapper $tagMapper,
        ShareMapper $shareMapper,
        FolderMapper $folderMapper,
        ConfigurationService $config,
        PasswordMapper $passwordMapper,
        KeychainMapper $keychainMapper,
        ChallengeMapper $challengeMapper,
        TagRevisionMapper $tagRevisionMapper,
        UserSettingsHelper $userSettingsHelper,
        AppSettingsService $appSettingsService,
        FolderRevisionMapper $folderRevisionMapper,
        PasswordRevisionMapper $passwordRevisionMapper,
        PasswordTagRelationMapper $passwordTagRelationMapper
    ) {
        $this->config                    = $config;
        $this->tagMapper                 = $tagMapper;
        $this->shareMapper               = $shareMapper;
        $this->folderMapper              = $folderMapper;
        $this->passwordMapper            = $passwordMapper;
        $this->keychainMapper            = $keychainMapper;
        $this->challengeMapper           = $challengeMapper;
        $this->tagRevisionMapper         = $tagRevisionMapper;
        $this->userSettingsHelper        = $userSettingsHelper;
        $this->appSettingsService        = $appSettingsService;
        $this->folderRevisionMapper      = $folderRevisionMapper;
        $this->passwordRevisionMapper    = $passwordRevisionMapper;
        $this->passwordTagRelationMapper = $passwordTagRelationMapper;
    }

    /**
     * @return array
     * @throws Exception
     */
    public function getData(): array {
        return [
            'version'              => self::BACKUP_VERSION,
            'passwords'            => $this->getModelArray($this->passwordMapper, $this->passwordRevisionMapper),
            'folders'              => $this->getModelArray($this->folderMapper, $this->folderRevisionMapper),
            'tags'                 => $this->getModelArray($this->tagMapper, $this->tagRevisionMapper),
            'shares'               => $this->getEntityArray($this->shareMapper),
            'keychains'            => $this->getEntityArray($this->keychainMapper),
            'challenges'           => $this->getEntityArray($this->challengeMapper),
            'passwordTagRelations' => $this->getEntityArray($this->passwordTagRelationMapper),
            'keys'                 => [
                'server' => [
                    'secret'         => $this->config->getSystemValue('secret'),
                    'SSEv1ServerKey' => $this->config->getAppValue('SSEv1ServerKey', null)
                ],
                'users'  => $this->getUserKeys()
            ],
            'settings'             => [
                'application' => $this->getApplicationSettings(),
                'users'       => $this->getUserSettings(),
                'clients'     => $this->getClientSettings()
            ]
        ];
    }

    /**
     * @param AbstractMapper                        $modelMapper
     * @param AbstractRevisionMapper|AbstractMapper $revisionMapper
     *
     * @return array
     * @throws \OCP\DB\Exception
     */
    protected function getModelArray(AbstractMapper $modelMapper, AbstractMapper $revisionMapper): array {
        $modelMapper->clearEntityCache();
        /** @var Password[] $passwords */
        $passwords = $modelMapper->findAll();

        $modelArray = [];
        foreach($passwords as $password) {
            $array              = $password->toArray();
            $array['revisions'] = [];

            $revisions = $revisionMapper->findAllByModel($password->getUuid());
            foreach($revisions as $revision) {
                $array['revisions'][] = $revision->toArray();
            }

            $user = $password->getUserId();
            if(!in_array($user, $this->users)) $this->users[] = $user;
            $modelArray[] = $array;
        }

        return $modelArray;
    }

    /**
     * @return array
     * @throws Exception
     */
    protected function getUserKeys(): array {
        $keys = [];
        foreach($this->users as $user) {
            $keys[ $user ] = [
                'SSEv1UserKey' => $this->config->getUserValue('SSEv1UserKey', null, $user),
                'ChallengeId'  => $this->config->getUserValue(UserChallengeService::USER_CHALLENGE_ID, null, $user)
            ];
        }

        return $keys;
    }

    /**
     * @param AbstractMapper $mapper
     *
     * @return array
     * @throws \OCP\DB\Exception
     */
    protected function getEntityArray(AbstractMapper $mapper): array {
        $mapper->clearEntityCache();
        $entities = $mapper->findAll();

        $entityArray = [];
        foreach($entities as $share) {
            $entityArray[] = $share->toArray();
        }

        return $entityArray;
    }

    /**
     * @return array
     * @throws Exception
     */
    protected function getUserSettings(): array {
        $settings = [];
        foreach($this->users as $user) {
            $settings[ $user ] = $this->userSettingsHelper->listRaw($user);
        }

        return $settings;
    }

    /**
     * @return array
     * @throws Exception
     */
    protected function getClientSettings(): array {
        $settings = [];
        foreach($this->users as $user) {
            $settings[ $user ] = $this->config->getUserValue('client/settings', '{}', $user);
        }

        return $settings;
    }

    /**
     * @return array
     */
    protected function getApplicationSettings(): array {
        $options = $this->appSettingsService->list();
        $settings = [];

        foreach($options as $option) {
            $settings[$option['name']] = $option['isDefault'] ? null:$option['value'];
        }

        return $settings;
    }
}