<?php
/**
 * This file is part of the Passwords App
 * created by Marius David Wieschollek
 * and licensed under the AGPL.
 */

namespace OCA\Passwords\Services\Object;

use Exception;
use OCA\Passwords\Db\AbstractMapper;
use OCA\Passwords\Db\EntityInterface;
use OCA\Passwords\Db\PasswordRevision;
use OCA\Passwords\Db\PasswordTagRelation;
use OCA\Passwords\Db\PasswordTagRelationMapper;
use OCA\Passwords\Db\TagRevision;
use OCA\Passwords\Helper\Uuid\UuidHelper;
use OCA\Passwords\Services\EnvironmentService;
use OCP\EventDispatcher\IEventDispatcher;

/**
 * Class PasswordTagRelationService
 *
 * @package OCA\Passwords\Services\Object
 */
class PasswordTagRelationService extends AbstractService {

    /**
     * @var PasswordTagRelationMapper|AbstractMapper
     */
    protected AbstractMapper $mapper;

    /**
     * @var string
     */
    protected string $class = PasswordTagRelation::class;

    /**
     * PasswordTagRelationService constructor.
     *
     * @param UuidHelper                $uuidHelper
     * @param IEventDispatcher          $eventDispatcher
     * @param EnvironmentService        $environment
     * @param PasswordTagRelationMapper $mapper
     */
    public function __construct(UuidHelper $uuidHelper, IEventDispatcher $eventDispatcher, EnvironmentService $environment, PasswordTagRelationMapper $mapper) {
        $this->mapper = $mapper;

        parent::__construct($uuidHelper, $eventDispatcher, $environment);
    }

    /**
     * @return PasswordTagRelation[]
     */
    public function findAll(): array {
        return $this->mapper->findAll();
    }

    /**
     * @param string $passwordUuid
     *
     * @return PasswordTagRelation[]
     * @throws Exception
     */
    public function findByPassword(string $passwordUuid): array {
        return $this->mapper->findAllByField('password', $passwordUuid);
    }

    /**
     * @param string $tagUuid
     *
     * @return PasswordTagRelation[]
     * @throws Exception
     */
    public function findByTag(string $tagUuid): array {
        return $this->mapper->findAllByField('tag', $tagUuid);
    }

    /**
     * @param string $tagUuid
     * @param string $passwordUuid
     *
     * @return PasswordTagRelation|EntityInterface|null
     * @throws Exception
     */
    public function findByTagAndPassword(string $tagUuid, string $passwordUuid): ?PasswordTagRelation {
        return $this->mapper->findOneByFields(
            ['password', $passwordUuid],
            ['tag', $tagUuid]
        );
    }

    /**
     * @param PasswordRevision $password
     * @param TagRevision      $tag
     *
     * @return PasswordTagRelation
     * @throws Exception
     */
    public function create(PasswordRevision $password, TagRevision $tag): PasswordTagRelation {
        if($password->getUserId() !== $tag->getUserId()) {
            throw new Exception('User ID did not match when creating password to tag relation');
        }

        $model = $this->createModel($password, $tag);
        $this->fireEvent('instantiated', $model);

        return $model;
    }

    /**
     * @param EntityInterface|PasswordTagRelation $original
     * @param array           $overwrites
     *
     * @return EntityInterface|PasswordTagRelation
     */
    protected function cloneModel(EntityInterface $original, array $overwrites = []): EntityInterface {
        /** @var PasswordTagRelation $clone */
        $clone = parent::cloneModel($original, $overwrites);
        $clone->setClient($this->environment->getClient());

        return $clone;
    }

    /**
     * @param PasswordRevision $password
     * @param TagRevision      $tag
     *
     * @return PasswordTagRelation
     */
    protected function createModel(PasswordRevision $password, TagRevision $tag): PasswordTagRelation {
        $model = new PasswordTagRelation();
        $model->setUuid($this->uuidHelper->generateUuid());
        $model->setDeleted(false);
        if($this->userId !== null) $model->setUserId($this->userId);
        $model->setCreated(time());
        $model->setUpdated(time());

        $model->setTag($tag->getModel());
        $model->setTagRevision($tag->getUuid());
        $model->setPassword($password->getModel());
        $model->setPasswordRevision($password->getUuid());
        $model->setHidden($password->isHidden() || $tag->isHidden());
        $model->setClient($this->environment->getClient());

        return $model;
    }
}