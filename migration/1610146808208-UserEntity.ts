import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntity1610146808208 implements MigrationInterface {
    name = 'UserEntity1610146808208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `budget_entity` CHANGE `id` `budgetId` int NOT NULL AUTO_INCREMENT");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `budget_entity` CHANGE `budgetId` `id` int NOT NULL AUTO_INCREMENT");
    }

}
