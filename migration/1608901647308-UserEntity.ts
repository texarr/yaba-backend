import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntity1608901647308 implements MigrationInterface {
    name = 'UserEntity1608901647308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_entity` ADD `emailConfirmed` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `user_entity` ADD `confirmationToken` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_entity` DROP COLUMN `confirmationToken`");
        await queryRunner.query("ALTER TABLE `user_entity` DROP COLUMN `emailConfirmed`");
    }

}
