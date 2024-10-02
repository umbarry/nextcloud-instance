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

namespace OCA\Passwords\Helper\AppSettings;

use OCA\Passwords\Exception\ApiException;
use OCA\Passwords\Services\ConfigurationService;
use OCP\AppFramework\Http;

/**
 * Class AbstractSettingsHelper
 *
 * @package OCA\Passwords\Helper\AppSettings
 */
abstract class AbstractSettingsHelper {

    /**
     * @var ConfigurationService
     */
    protected ConfigurationService $config;

    /**
     * @var string
     */
    protected string $scope;

    /**
     * @var array
     */
    protected array $keys = [];

    /**
     * @var array
     */
    protected array $types = [];

    /**
     * @var array
     */
    protected array $defaults = [];

    /**
     * AbstractSettingsHelper constructor.
     *
     * @param ConfigurationService $config
     */
    public function __construct(ConfigurationService $config) {
        $this->config = $config;
    }

    /**
     * @return array
     */
    public function list(): array {
        $settings = [];

        foreach($this->keys as $key => $value) {
            try {
                $settings[] = $this->getGenericSetting($key);
            } catch(ApiException $e) {
            }
        }

        return $settings;
    }

    /**
     * @param string $key
     *
     * @return array
     * @throws ApiException
     */
    public function get(string $key): array {
        if(isset($this->keys[ $key ])) {
            return $this->getGenericSetting($key);
        }

        throw new ApiException('Unknown setting identifier', Http::STATUS_BAD_REQUEST);
    }

    /**
     * @param string $key
     * @param        $value
     *
     * @return array
     * @throws ApiException
     */
    public function set(string $key, $value): array {
        $setting = $this->get($key);
        $value   = $this->castSettingValue($setting, $value);

        if(!$this->validateSetting($setting, $value)) {
            throw new ApiException('Invalid setting value', Http::STATUS_BAD_REQUEST);
        }

        $configKey = $this->getSettingKey($key);
        $this->config->setAppValue($configKey, $value);

        return $this->get($key);
    }

    /**
     * @param string $key
     *
     * @return array
     * @throws ApiException
     */
    public function reset(string $key): array {
        $configKey = $this->getSettingKey($key);
        $this->config->deleteAppValue($configKey);

        return $this->get($key);
    }

    /**
     * @param array $setting
     * @param       $value
     *
     * @return bool|int|string
     * @throws ApiException
     */
    protected function castSettingValue(array $setting, $value) {
        if($setting['type'] === 'select:string') {
            return strval($value);
        }

        if($setting['type'] === 'select:number') {
            if(!is_numeric($value)) throw new ApiException('Invalid setting value', Http::STATUS_BAD_REQUEST);

            return intval($value);
        }

        if($setting['type'] === 'string') {
            return strval($value);
        }

        if($setting['type'] === 'number') {
            if(!is_numeric($value)) throw new ApiException('Invalid setting value', Http::STATUS_BAD_REQUEST);

            return intval($value);
        }

        if($setting['type'] === 'boolean') {
            if(is_bool($value)) return $value;
            if($value === 'true' || $value === '1') return true;
            if($value === 'false' || $value === '') return false;

            throw new ApiException('Invalid setting value', Http::STATUS_BAD_REQUEST);
        }

        return null;
    }

    /**
     * @param array $setting
     * @param       $value
     *
     * @return bool
     */
    protected function validateSetting(array $setting, $value): bool {
        if($setting['type'] === 'select:string' || $setting['type'] === 'select:number') {
            foreach($setting['options'] as $option) {
                if($option['available'] && $option['value'] === $value) {
                    if($setting['type'] === 'select:number') return is_int($value);

                    return is_string($value);
                }
            }

            return false;
        }

        if($setting['type'] === 'string') {
            $length = strlen($value);

            return $length >= $setting['options']['min'] && $length <= $setting['options']['max'] && is_string($value);
        }

        if($setting['type'] === 'number') {
            return $value >= $setting['options']['min'] && ($value <= $setting['options']['max'] || $setting['options']['max'] === null) && is_int($value);
        }

        if($setting['type'] === 'boolean') {
            return is_bool($value);
        }

        return false;
    }

    /**
     * @param string      $key
     * @param string|null $type
     *
     * @return array
     * @throws ApiException
     */
    protected function getGenericSetting(string $key, string $type = null): array {
        $configKey = $this->getSettingKey($key);
        $default   = $this->getSettingDefault($key);
        $value     = $this->config->getAppValue($configKey, $default);
        $isDefault = !$this->config->hasAppValue($configKey);

        $options     = [];
        $optionsFunc = 'get'.str_replace(' ', '', ucwords(str_replace('.', ' ', $key))).'Options';
        if(method_exists($this, $optionsFunc)) {
            $options = $this->{$optionsFunc}();
        }

        if($type === null) {
            $type = $this->types[ $key ] ?? 'select:string';
        }
        if($type === 'boolean') $value = $value === '1';

        return $this->generateSettingArray(
            $key,
            $value,
            $options,
            $default,
            $isDefault,
            $type,
            $this->getSettingDepends($key)
        );
    }

    /**
     * @param string $setting
     *
     * @return string
     * @throws ApiException
     */
    protected function getSettingKey(string $setting): string {
        if(isset($this->keys[ $setting ])) {
            return $this->keys[ $setting ];
        }

        $optionsFunc = 'get'.str_replace(' ', '', ucwords(str_replace('.', ' ', $setting))).'Key';
        if(method_exists($this, $optionsFunc)) {
            return $this->{$optionsFunc}($setting);
        }

        throw new ApiException('Unknown setting identifier', Http::STATUS_BAD_REQUEST);
    }

    /**
     * @param string $setting
     *
     * @return mixed
     * @throws ApiException
     */
    protected function getSettingDefault(string $setting) {
        if(isset($this->defaults[ $setting ])) {
            return $this->defaults[ $setting ];
        }

        $optionsFunc = 'get'.str_replace(' ', '', ucwords(str_replace('.', ' ', $setting))).'Defaults';
        if(method_exists($this, $optionsFunc)) {
            return $this->{$optionsFunc}($setting);
        }

        throw new ApiException('Unknown setting identifier', Http::STATUS_BAD_REQUEST);
    }

    /**
     * @param string $setting
     *
     * @return array
     * @throws ApiException
     */
    protected function getSettingDepends(string $setting): array {
        if(isset($this->depends[ $setting ])) {
            return $this->depends[ $setting ];
        }

        $optionsFunc = 'get'.str_replace(' ', '', ucwords(str_replace('.', ' ', $setting))).'Depends';
        if(method_exists($this, $optionsFunc)) {
            return $this->{$optionsFunc}($setting);
        }

        return [];
    }

    /**
     * @param        $name
     * @param        $value
     * @param array  $options
     * @param string $default
     * @param bool   $isDefault
     * @param string $type
     * @param array  $depends
     *
     * @return array
     */
    protected function generateSettingArray($name, $value, $options = [], $default = '', $isDefault = false, $type = 'select', $depends = []): array {

        if($type === 'string' && $options === []) {
            $options = ['min' => 0, 'max' => 2048];
        }
        if($type === 'number' && $options === []) {
            $options = ['min' => 0, 'max' => null];
        }

        return [
            'name'      => $this->scope.'.'.$name,
            'value'     => $value,
            'type'      => $type,
            'default'   => $default,
            'isDefault' => $isDefault,
            'options'   => $options,
            'depends'   => $depends
        ];
    }

    /**
     * @param      $value
     * @param      $label
     * @param bool $available
     *
     * @return array
     */
    protected function generateOptionArray($value, $label, bool $available = true): array {
        return [
            'value'     => $value,
            'label'     => $label,
            'available' => $available
        ];
    }
}