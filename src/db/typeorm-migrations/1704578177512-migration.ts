import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1704578177512 implements MigrationInterface {
    name = 'Migration1704578177512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a24972ebd73b106250713dcddd\` ON \`profile\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a24972ebd73b106250713dcddd\` ON \`profile\` (\`userId\`)`);
    }

}
