import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import {Length, IsNotEmpty, IsEmail} from 'class-validator';
import bcrypt from 'bcryptjs';

export type UserDTO = {
  username: string;
  email: string;
  id?: number;
};

@Entity()
@Unique(['username', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Length(4, 20)
  username!: string;

  @Column()
  @IsEmail()
  email!: string;

  @Column()
  @Length(4, 100)
  password!: string;

  @Column()
  @IsNotEmpty()
  role!: string;

  @Column()
  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt!: Date;

  hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  passwordIsValid(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
