import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700782601447 implements MigrationInterface {
    name = 'Migration1700782601447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a24972ebd73b106250713dcddd\` ON \`profile\``);
        await queryRunner.query(`DROP INDEX \`IDX_b1bda35cdb9a2c1b777f5541d8\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`imageRoute\` \`imageRoute\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`imageRoute\` \`imageRoute\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_b1bda35cdb9a2c1b777f5541d8\` ON \`users\` (\`profileId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a24972ebd73b106250713dcddd\` ON \`profile\` (\`userId\`)`);
    }

}
