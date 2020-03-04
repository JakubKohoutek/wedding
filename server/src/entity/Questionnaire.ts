import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import {IsNotEmpty} from 'class-validator';

export type QuestionnaireDTO = {
  id?: number;
  registratorId: number;
  name: string;
  surname: string;
  foodRequirements: boolean;
  foodRequirementsDetail: string;
  accomodationFriday: boolean;
  accomodationSaturday: boolean;
  isChild: boolean;
  age: number;
};

@Entity()
export class Questionnaire {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  registratorId!: number;

  @Column()
  name!: string;

  @Column()
  surname!: string;

  @Column()
  foodRequirements!: string;

  @Column()
  accomodationFriday!: boolean;

  @Column()
  accomodationSaturday!: boolean;

  @Column()
  isChild!: boolean;

  @Column()
  age!: number;

  @Column()
  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt!: Date;
}
