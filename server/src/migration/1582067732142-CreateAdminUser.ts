import {MigrationInterface, getRepository} from 'typeorm';
import {User} from '../entity/User';

export class CreateAdminUser1547919837483 implements MigrationInterface {
  public async up(): Promise<void> {
    const user = new User();
    user.username = process.env.DB_USER_NAME || 'admin';
    user.password = process.env.DB_USER_PSWD || 'admin';
    user.role = 'ADMIN';

    user.hashPassword();

    const userRepository = getRepository(User);
    await userRepository.save(user);
  }

  public async down(): Promise<void> {
    const userRepository = getRepository(User);
    await userRepository.delete({username: process.env.DB_USER_NAME || 'admin'});
  }
}
