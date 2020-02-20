import {MigrationInterface, getRepository} from 'typeorm';
import {User} from '../entity/User';

export class CreateAdminUser1547919837483 implements MigrationInterface {
  public async up(): Promise<void> {
    const user = new User();
    user.username = process.env.ADMIN_NAME || 'admin';
    user.password = process.env.ADMIN_PSWD || 'admin';
    user.email = process.env.ADMIN_EMAIL || 'admin@admin.cz';
    user.role = 'ADMIN';

    user.hashPassword();

    const userRepository = getRepository(User);
    await userRepository.save(user);
  }

  public async down(): Promise<void> {
    const userRepository = getRepository(User);
    await userRepository.delete({username: process.env.ADMIN_NAME});
  }
}
