import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntity1609886543596 implements MigrationInterface {
    name = 'UserEntity1609886543596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `child_category_entity` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `categoryId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `category_entity` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `icon` varchar(255) NOT NULL, `incomeCategoriesTemplateId` int NULL, `outcomeCategoriesTemplateId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `category_template_entity` (`templateId` int NOT NULL AUTO_INCREMENT, `templateName` varchar(255) NOT NULL, `isActive` tinyint NOT NULL, `userId` varchar(255) NULL, PRIMARY KEY (`templateId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_entity` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `emailConfirmed` tinyint NOT NULL, `confirmationToken` varchar(255) NOT NULL, UNIQUE INDEX `IDX_415c35b9b3b6fe45a3b065030f` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `child_category_entity` ADD CONSTRAINT `FK_d2483a8174e467ff9a3505e59cc` FOREIGN KEY (`categoryId`) REFERENCES `category_entity`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `category_entity` ADD CONSTRAINT `FK_c18323cdfaaf802bdb1e8f233af` FOREIGN KEY (`incomeCategoriesTemplateId`) REFERENCES `category_template_entity`(`templateId`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `category_entity` ADD CONSTRAINT `FK_4e2dfe2419b338e206fce7d625f` FOREIGN KEY (`outcomeCategoriesTemplateId`) REFERENCES `category_template_entity`(`templateId`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `category_template_entity` ADD CONSTRAINT `FK_0fcde7c1a1ac3938d0700ef87b4` FOREIGN KEY (`userId`) REFERENCES `user_entity`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `category_template_entity` DROP FOREIGN KEY `FK_0fcde7c1a1ac3938d0700ef87b4`");
        await queryRunner.query("ALTER TABLE `category_entity` DROP FOREIGN KEY `FK_4e2dfe2419b338e206fce7d625f`");
        await queryRunner.query("ALTER TABLE `category_entity` DROP FOREIGN KEY `FK_c18323cdfaaf802bdb1e8f233af`");
        await queryRunner.query("ALTER TABLE `child_category_entity` DROP FOREIGN KEY `FK_d2483a8174e467ff9a3505e59cc`");
        await queryRunner.query("DROP INDEX `IDX_415c35b9b3b6fe45a3b065030f` ON `user_entity`");
        await queryRunner.query("DROP TABLE `user_entity`");
        await queryRunner.query("DROP TABLE `category_template_entity`");
        await queryRunner.query("DROP TABLE `category_entity`");
        await queryRunner.query("DROP TABLE `child_category_entity`");
    }

}
