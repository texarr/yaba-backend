import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntity1608508429795 implements MigrationInterface {
    name = 'UserEntity1608508429795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user_entity` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, UNIQUE INDEX `IDX_415c35b9b3b6fe45a3b065030f` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_415c35b9b3b6fe45a3b065030f` ON `user_entity`");
        await queryRunner.query("DROP TABLE `user_entity`");
    }

}
