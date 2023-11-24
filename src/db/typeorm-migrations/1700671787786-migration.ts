import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700671787786 implements MigrationInterface {
    name = 'Migration1700671787786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD UNIQUE INDEX \`IDX_a24972ebd73b106250713dcddd\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`profileId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_b1bda35cdb9a2c1b777f5541d8\` (\`profileId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_a24972ebd73b106250713dcddd\` ON \`profile\` (\`userId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_b1bda35cdb9a2c1b777f5541d8\` ON \`users\` (\`profileId\`)`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD CONSTRAINT \`FK_a24972ebd73b106250713dcddd9\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_b1bda35cdb9a2c1b777f5541d87\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_b1bda35cdb9a2c1b777f5541d87\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_a24972ebd73b106250713dcddd9\``);
        await queryRunner.query(`DROP INDEX \`REL_b1bda35cdb9a2c1b777f5541d8\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`REL_a24972ebd73b106250713dcddd\` ON \`profile\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_b1bda35cdb9a2c1b777f5541d8\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`profileId\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP INDEX \`IDX_a24972ebd73b106250713dcddd\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`userId\``);
    }

}
