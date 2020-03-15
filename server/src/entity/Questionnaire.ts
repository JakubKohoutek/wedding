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
  foodRequirements: string;
  accommodationFriday: boolean;
  accommodationSaturday: boolean;
  isChild: boolean;
  age?: number;
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
  accommodationFriday!: boolean;

  @Column()
  accommodationSaturday!: boolean;

  @Column()
  isChild!: boolean;

  @Column({nullable: true, type: String})
  age!: number | null;

  @Column()
  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt!: Date;
}
