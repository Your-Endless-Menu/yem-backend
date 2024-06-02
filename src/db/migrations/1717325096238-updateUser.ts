import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1717325096238 implements MigrationInterface {
    name = 'UpdateUser1717325096238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "user_id" TO "id"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" TO "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER SEQUENCE "user_user_id_seq" RENAME TO "user_id_seq"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER SEQUENCE "user_id_seq" RENAME TO "user_user_id_seq"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "PK_cace4a159ff9f2512dd42373760" TO "PK_758b8ce7c18b9d347461b30228d"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "id" TO "user_id"`);
    }

}
