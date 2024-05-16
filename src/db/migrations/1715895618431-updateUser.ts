import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1715895618431 implements MigrationInterface {
    name = 'UpdateUser1715895618431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
    }

}
