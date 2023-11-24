import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700671012606 implements MigrationInterface {
    name = 'Migration1700671012606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`profile\` (\`id\` varchar(36) NOT NULL, \`imageRoute\` varchar(255) NOT NULL, \`Description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`profile\``);
    }

}
