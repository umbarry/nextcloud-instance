<?php
/**
 * This file is part of the Passwords App
 * created by Marius David Wieschollek
 * and licensed under the AGPL.
 */

namespace OCA\Passwords\Db;

/**
 * Class FolderMapper
 *
 * @package OCA\Passwords\Db
 */
class FolderMapper extends AbstractMapper {

    const TABLE_NAME = 'passwords_folder';

    /**
     * @param string $parentUuid
     *
     * @return Folder[]
     */
    public function findAllByParentFolder(string $parentUuid): array {
        $sql = $this->getJoinStatement(FolderRevisionMapper::TABLE_NAME);

        $sql->andWhere(
            $sql->expr()->eq('b.parent', $sql->createNamedParameter($parentUuid))
        );

        return $this->findEntities($sql);
    }

}