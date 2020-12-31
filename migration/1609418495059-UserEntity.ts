import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntity1609418495059 implements MigrationInterface {
    name = 'UserEntity1609418495059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `icon_entity` (`name` varchar(255) NOT NULL, `content` varchar(255) NOT NULL, `categoryId` int NULL, PRIMARY KEY (`name`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `child_category_entity` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `categoryId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `category_entity` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `category_template_entity` (`id` int NOT NULL AUTO_INCREMENT, `templateName` varchar(255) NOT NULL, `userId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_entity` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `emailConfirmed` tinyint NOT NULL, `confirmationToken` varchar(255) NOT NULL, UNIQUE INDEX `IDX_415c35b9b3b6fe45a3b065030f` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `icon_entity` ADD CONSTRAINT `FK_cf294641bc7a7c1a094bb5635ff` FOREIGN KEY (`categoryId`) REFERENCES `category_entity`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `child_category_entity` ADD CONSTRAINT `FK_d2483a8174e467ff9a3505e59cc` FOREIGN KEY (`categoryId`) REFERENCES `category_entity`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `category_template_entity` ADD CONSTRAINT `FK_0fcde7c1a1ac3938d0700ef87b4` FOREIGN KEY (`userId`) REFERENCES `user_entity`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `category_template_entity` DROP FOREIGN KEY `FK_0fcde7c1a1ac3938d0700ef87b4`");
        await queryRunner.query("ALTER TABLE `child_category_entity` DROP FOREIGN KEY `FK_d2483a8174e467ff9a3505e59cc`");
        await queryRunner.query("ALTER TABLE `icon_entity` DROP FOREIGN KEY `FK_cf294641bc7a7c1a094bb5635ff`");
        await queryRunner.query("DROP INDEX `IDX_415c35b9b3b6fe45a3b065030f` ON `user_entity`");
        await queryRunner.query("DROP TABLE `user_entity`");
        await queryRunner.query("DROP TABLE `category_template_entity`");
        await queryRunner.query("DROP TABLE `category_entity`");
        await queryRunner.query("DROP TABLE `child_category_entity`");
        await queryRunner.query("DROP TABLE `icon_entity`");
    }

}
