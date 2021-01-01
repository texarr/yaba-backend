import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntity1609542587920 implements MigrationInterface {
    name = 'UserEntity1609542587920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `category_entity` ADD `icon` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `category_entity` DROP COLUMN `icon`");
    }

}
