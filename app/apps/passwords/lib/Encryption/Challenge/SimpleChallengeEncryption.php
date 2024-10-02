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

namespace OCA\Passwords\Encryption\Challenge;

use Exception;
use OCA\Passwords\Db\Challenge;
use OCA\Passwords\Encryption\Object\SseV1Encryption;
use OCA\Passwords\Exception\Encryption\InvalidEncryptionResultException;

/**
 * Class SimpleChallengeEncryption
 *
 * @package OCA\Passwords\Encryption\Challenge
 */
class SimpleChallengeEncryption extends SseV1Encryption implements ChallengeEncryptionInterface {

    /**
     * @return string
     */
    public function getType(): string {
        return Challenge::TYPE_PWD_V1R1;
    }

    /**
     * @param Challenge $challenge
     *
     * @return Challenge
     * @throws Exception
     */
    public function encryptChallenge(Challenge $challenge): Challenge {
        $encryptionKey = $this->getSimpleEncryptionKey($this->userId);

        $fields = ['secret', 'clientData', 'serverData'];
        foreach($fields as $field) {
            $value          = $challenge->getProperty($field);
            $encryptedValue = $this->crypto->encrypt($value, $encryptionKey);
            if($value === $encryptedValue) {
                throw new InvalidEncryptionResultException();
            }

            $challenge->setProperty($field, $encryptedValue);
        }

        return $challenge;
    }

    /**
     * @param Challenge $challenge
     *
     * @return Challenge
     * @throws Exception
     */
    public function decryptChallenge(Challenge $challenge): Challenge {
        $encryptionKey = $this->getSimpleEncryptionKey($this->userId);

        $fields = ['secret', 'clientData', 'serverData'];
        foreach($fields as $field) {
            $value          = $challenge->getProperty($field);
            $encryptedValue = $this->crypto->decrypt($value, $encryptionKey);
            $challenge->setProperty($field, $encryptedValue);
        }

        return $challenge;
    }

    /**
     * @param string $userId
     *
     * @return string
     * @throws Exception
     */
    protected function getSimpleEncryptionKey(string $userId): string {
        return $this->getServerKey().$this->getUserKey($userId);
    }
}