<?php
/**
 * This file is part of the Passwords App
 * created by Marius David Wieschollek
 * and licensed under the AGPL.
 */

namespace OCA\Passwords\Helper\AppSettings;

use OCA\Passwords\Services\ConfigurationService;
use OCP\IL10N;

/**
 * Class BackupSettingsHelper
 *
 * @package OCA\Passwords\Helper\AppSettings
 */
class BackupSettingsHelper extends AbstractSettingsHelper {

    /**
     * @var IL10N
     */
    protected IL10N $localisation;

    /**
     * @var string
     */
    protected string $scope = 'backup';

    /**
     * @var array
     */
    protected array $keys
        = [
            'interval'           => 'backup/interval',
            'files.max'          => 'backup/files/maximum',
            'update.autorestore' => 'backup/update/autorestore'
        ];

    /**
     * @var array
     */
    protected array $types
        = [
            'interval'           => 'select:number',
            'files.max'          => 'number',
            'update.autorestore' => 'boolean'
        ];

    /**
     * @var array
     */
    protected array $defaults
        = [
            'interval'           => 86400,
            'files.max'          => 28,
            'update.autorestore' => true
        ];

    /**
     * BackupSettingsHelper constructor.
     *
     * @param ConfigurationService $config
     * @param IL10N                $localisation
     */
    public function __construct(ConfigurationService $config, IL10N $localisation) {
        parent::__construct($config);
        $this->localisation = $localisation;
    }

    /**
     * @return array
     */
    protected function getIntervalOptions(): array {
        return [
            $this->generateOptionArray(
                3600,
                $this->localisation->t('Every hour')
            ),
            $this->generateOptionArray(
                21600,
                $this->localisation->t('Every six hours')
            ),
            $this->generateOptionArray(
                86400,
                $this->localisation->t('Every day')
            ),
            $this->generateOptionArray(
                172800,
                $this->localisation->t('Every two days')
            ),
            $this->generateOptionArray(
                604800,
                $this->localisation->t('Every week')
            ),
            $this->generateOptionArray(
                1209600,
                $this->localisation->t('Every two weeks')
            ),
        ];
    }
}