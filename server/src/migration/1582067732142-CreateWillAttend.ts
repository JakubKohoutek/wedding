import {MigrationInterface, QueryRunner} from 'typeorm';
import {getRepository} from 'typeorm';

import {Questionnaire} from '../entity/Questionnaire';

export class CreateWillAttendColumn1547919837483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "questionnaire" ADD "willAttend" "boolean"`);
    await queryRunner.query(`UPDATE "questionnaire" SET "willAttend"=1`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const COLUMN_TO_DROP = 'willAttend';
    const TABLE_NAME = 'questionnaire';

    const questionnaireRepository = getRepository(Questionnaire);
    const otherColumns = Object.values(questionnaireRepository.metadata.propertiesMap)
      .filter((item) => item !== COLUMN_TO_DROP)
      .join(',');

    await queryRunner.query(
      `CREATE TEMPORARY TABLE ${TABLE_NAME}_backup(${otherColumns});`
    );
    await queryRunner.query(
      `INSERT INTO ${TABLE_NAME}_backup SELECT ${otherColumns} FROM ${TABLE_NAME};`
    );
    await queryRunner.query(`DROP TABLE ${TABLE_NAME};`);
    await queryRunner.query(`CREATE TABLE ${TABLE_NAME}(${otherColumns});`);
    await queryRunner.query(
      `INSERT INTO ${TABLE_NAME} SELECT ${otherColumns} FROM ${TABLE_NAME}_backup;`
    );
    await queryRunner.query(`DROP TABLE ${TABLE_NAME}_backup;`);
  }
}
