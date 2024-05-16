import { MigrationInterface, QueryRunner } from "typeorm";

export class User1715755960930 implements MigrationInterface {
    name = 'User1715755960930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("user_id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "emails" text array NOT NULL, "password" character varying NOT NULL, "role" text array NOT NULL, CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
