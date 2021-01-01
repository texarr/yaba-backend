import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntity1609542515650 implements MigrationInterface {
    name = 'UserEntity1609542515650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `category_entity` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `categoryTemplateId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `category_entity` ADD CONSTRAINT `FK_0d323799db3654205761bc77872` FOREIGN KEY (`categoryTemplateId`) REFERENCES `category_template_entity`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `category_entity` DROP FOREIGN KEY `FK_0d323799db3654205761bc77872`");
        await queryRunner.query("DROP TABLE `category_entity`");
    }

}
