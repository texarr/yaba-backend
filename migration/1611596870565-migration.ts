import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1611596870565 implements MigrationInterface {
    name = 'migration1611596870565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `child_category_entity` CHANGE `incomes` `incomes` int NULL");
        await queryRunner.query("ALTER TABLE `child_category_entity` CHANGE `expenses` `expenses` int NULL");
        await queryRunner.query("ALTER TABLE `child_category_entity` CHANGE `deficitOrSurplus` `deficitOrSurplus` int NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `child_category_entity` CHANGE `deficitOrSurplus` `deficitOrSurplus` int NOT NULL");
        await queryRunner.query("ALTER TABLE `child_category_entity` CHANGE `expenses` `expenses` int NOT NULL");
        await queryRunner.query("ALTER TABLE `child_category_entity` CHANGE `incomes` `incomes` int NOT NULL");
    }

}
