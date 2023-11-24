import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700782859345 implements MigrationInterface {
    name = 'Migration1700782859345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`Description\` \`Description\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`Description\` \`Description\` varchar(255) NOT NULL`);
    }

}
