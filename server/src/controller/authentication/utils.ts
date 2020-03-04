import passport from 'passport';
import {getRepository} from 'typeorm';
import jwt from 'jsonwebtoken';

import {User, UserDTO} from '../../entity/User';

export const setup = (): void => {
  passport.serializeUser((user: UserDTO, done) => done(null, user.id));

  passport.deserializeUser(async (id: number, done) => {
    try {
      const userRepository = getRepository(User);
      const user = await userRepository.findOneOrFail(id);
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  });
};

export const signToken = (user: UserDTO): string =>
  jwt.sign({data: user}, process.env.JWT_SECRET, {
    expiresIn: '12h'
  });
