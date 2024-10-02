<?php
/**
 * This file is part of the Passwords App
 * created by Marius David Wieschollek
 * and licensed under the AGPL.
 */

namespace OCA\Passwords\Db;

/**
 * Class Password
 *
 * @package OCA\Passwords\Db
 *
 * @method string|null getShareId()
 * @method void setShareId(string|null $shareId)
 * @method bool getEditable()
 * @method void setEditable(bool $editable)
 * @method bool getSuspended()
 * @method void setSuspended(bool $suspended)
 * @method bool getHasShares()
 * @method void setHasShares(bool $hasShares)
 */
class Password extends AbstractModel {

    /**
     * @var string|null
     */
    protected ?string $shareId;

    /**
     * @var bool
     */
    protected bool $hasShares;

    /**
     * @var bool
     */
    protected bool $editable;

    /**
     * @var bool
     */
    protected bool $suspended;

    /**
     * Password constructor.
     */
    public function __construct() {
        $this->addType('shareId', 'string');

        $this->addType('editable', 'boolean');
        $this->addType('suspended', 'boolean');
        $this->addType('hasShares', 'boolean');

        parent::__construct();
    }

    /**
     * @return bool
     */
    public function isEditable(): bool {
        return $this->getEditable();
    }

    /**
     * @return bool
     */
    public function isSuspended(): bool {
        return $this->getSuspended() === true;
    }

    /**
     * @return bool
     */
    public function hasShares(): bool {
        return $this->getHasShares() === true;
    }
}