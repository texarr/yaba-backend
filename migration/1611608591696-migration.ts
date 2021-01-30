import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1611608591696 implements MigrationInterface {
    name = 'migration1611608591696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `budget_month_entity` ADD `budgetMonthId` int NULL");
        await queryRunner.query("ALTER TABLE `budget_month_entity` ADD CONSTRAINT `FK_1d51f239cf127f7e233976dbff1` FOREIGN KEY (`budgetMonthId`) REFERENCES `budget_entity`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `budget_month_entity` DROP FOREIGN KEY `FK_1d51f239cf127f7e233976dbff1`");
        await queryRunner.query("ALTER TABLE `budget_month_entity` DROP COLUMN `budgetMonthId`");
    }

}
