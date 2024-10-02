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

namespace OCA\Passwords\Migration\DatabaseRepair;

use Exception;
use OCA\Passwords\Db\FolderMapper;
use OCA\Passwords\Db\PasswordMapper;
use OCA\Passwords\Db\PasswordRevision;
use OCA\Passwords\Db\RevisionInterface;
use OCA\Passwords\Services\ConfigurationService;
use OCA\Passwords\Services\EncryptionService;
use OCA\Passwords\Services\EnvironmentService;
use OCA\Passwords\Services\Object\FolderService;
use OCA\Passwords\Services\Object\PasswordRevisionService;
use OCA\Passwords\Services\PasswordSecurityCheckService;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use OCP\Migration\IOutput;

/**
 * Class PasswordRevisionRepairHelper
 *
 * @package OCA\Passwords\Migration\DatabaseRepair
 */
class PasswordRevisionRepair extends AbstractRevisionRepair {

    /**
     * @var ConfigurationService
     */
    protected ConfigurationService $config;

    /**
     * @var FolderMapper
     */
    protected FolderMapper $folderMapper;

    /**
     * @var string
     */
    protected string $objectName = 'password';

    /**
     * @var bool
     */
    protected bool $convertFields = false;

    /**
     * PasswordRevisionRepair constructor.
     *
     * @param FolderMapper            $folderMapper
     * @param PasswordMapper          $modelMapper
     * @param ConfigurationService    $config
     * @param EncryptionService       $encryption
     * @param EnvironmentService      $environment
     * @param PasswordRevisionService $revisionService
     */
    public function __construct(
        FolderMapper            $folderMapper,
        PasswordMapper          $modelMapper,
        ConfigurationService    $config,
        EncryptionService       $encryption,
        EnvironmentService      $environment,
        PasswordRevisionService $revisionService
    ) {
        parent::__construct($modelMapper, $revisionService, $encryption, $environment);
        $this->folderMapper  = $folderMapper;
        $this->convertFields = $this->enhancedRepair || $config->getAppValue('migration/customFields') !== '2020.12.2';
        $this->config        = $config;
    }

    /**
     * @param IOutput $output
     *
     * @throws Exception
     */
    public function run(IOutput $output): void {
        parent::run($output);
        $this->config->setAppValue('migration/customFields', '2020.12.2');
    }

    /**
     * @param PasswordRevision|RevisionInterface $revision
     *
     * @return bool
     * @throws Exception
     */
    public function repairRevision(RevisionInterface $revision): bool {
        $fixed = false;

        if($revision->_isDecrypted() === false && $revision->getCustomFields() === '[]') {
            $revision->setCustomFields(null);
            $fixed = true;
        }

        $fixed = $this->checkEmptySecretDecryption($revision, $fixed);

        if($revision->getCustomFields() === null && $revision->getCseType() === EncryptionService::CSE_ENCRYPTION_NONE && $revision->getSseType() !== EncryptionService::SSE_ENCRYPTION_V2R1) {
            if($this->decryptOrDelete($revision)) $revision->setCustomFields('[]');
            $fixed = true;
        }

        if($this->convertCustomFields($revision)) $fixed = true;
        if($this->cleanCustomFields($revision)) $fixed = true;

        if($revision->getStatus() !== PasswordSecurityCheckService::LEVEL_OK && $revision->getStatusCode() === PasswordSecurityCheckService::STATUS_GOOD) {
            $revision->setStatus(PasswordSecurityCheckService::LEVEL_OK);
            $fixed = true;
        }

        if(empty($revision->getHash()) && $revision->getStatus() !== PasswordSecurityCheckService::LEVEL_UNKNOWN) {
            $revision->setStatus(PasswordSecurityCheckService::LEVEL_UNKNOWN);
            $fixed = true;
        }

        if($revision->getFolder() !== FolderService::BASE_FOLDER_UUID) {
            try {
                $this->folderMapper->findByUuid($revision->getFolder());
            } catch(DoesNotExistException|MultipleObjectsReturnedException $e) {
                $revision->setFolder(FolderService::BASE_FOLDER_UUID);
                $fixed = true;
            }
        }

        if($fixed) $this->revisionService->save($revision);

        return parent::repairRevision($revision) || $fixed;
    }

    /**
     * Convert legacy custom fields structure
     *
     * @param PasswordRevision $revision
     *
     * @return bool
     */
    public function convertCustomFields(PasswordRevision $revision): bool {
        if(!$this->convertFields || $revision->getCseType() !== EncryptionService::CSE_ENCRYPTION_NONE || $revision->getSseType() === EncryptionService::SSE_ENCRYPTION_V2R1) return false;

        if(!$this->decryptOrDelete($revision)) return true;
        $customFields = $revision->getCustomFields();

        if(substr($customFields, 0, 1) === '[') return false;
        if($customFields === '{}' || empty($customFields)) {
            $revision->setCustomFields('[]');

            return true;
        }

        $oldFields = json_decode($customFields, true);
        if(!is_array($oldFields)) {
            $revision->setCustomFields('[]');

            return true;
        }

        $newFields = [];
        foreach($oldFields as $label => $data) {
            if(substr($label, 0, 1) === '_') $data['type'] = 'data';

            $newFields[] = ['label' => $label, 'type' => $data['type'], 'value' => $data['value']];
        }

        $revision->setCustomFields(json_encode($newFields));

        return true;
    }

    /**
     * Remove messy data from custom fields
     *
     * @param PasswordRevision $revision
     *
     * @return bool
     */
    public function cleanCustomFields(PasswordRevision $revision): bool {
        if(!$this->convertFields || $revision->getCseType() !== EncryptionService::CSE_ENCRYPTION_NONE || $revision->getSseType() === EncryptionService::SSE_ENCRYPTION_V2R1) return false;

        if(!$this->decryptOrDelete($revision)) return true;
        $customFields = $revision->getCustomFields();

        if(strpos($customFields, '"blank":') === false && strpos($customFields, '"id":') === false && strpos($customFields, '"type":null') === false) return false;

        $oldFields = json_decode($customFields, true);
        if(!is_array($oldFields)) {
            $revision->setCustomFields('[]');

            return true;
        }

        $newFields = [];
        foreach($oldFields as $label => $data) {
            if($data['type'] === null) {
                if($data['value'] === null) continue;
                $data['type'] = 'text';
            }

            $newFields[] = ['label' => $data['label'], 'type' => $data['type'], 'value' => $data['value']];
        }

        $revision->setCustomFields(json_encode($newFields));

        return true;
    }
}