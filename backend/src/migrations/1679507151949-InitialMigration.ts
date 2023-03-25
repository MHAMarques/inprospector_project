import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1679507151949 implements MigrationInterface {
    name = 'InitialMigration1679507151949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "phone" character varying(15) NOT NULL, "password" character varying(120) NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "prospects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "phone" character varying(15) NOT NULL, "linkedin" character varying(250) NOT NULL, "company" character varying(250) NOT NULL, "job_title" character varying(250) NOT NULL, "information" character varying(960) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_9fc60d8f29db14b861e3c96568e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "prospects" ADD CONSTRAINT "FK_28f24399ce70561f095dedae5ab" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prospects" DROP CONSTRAINT "FK_28f24399ce70561f095dedae5ab"`);
        await queryRunner.query(`DROP TABLE "prospects"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
