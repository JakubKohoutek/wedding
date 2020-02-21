import passport from 'passport';
import {getRepository} from 'typeorm';
import jwt from 'jsonwebtoken';

import {User, UserCore} from '../../entity/User';

export const setup = (): void => {
  passport.serializeUser((user: UserCore, done) => done(null, user.id));

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

export const signToken = (user: UserCore): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('Missing environment variable JWT_SECRET');
  }

  return jwt.sign({data: user}, process.env.JWT_SECRET, {
    expiresIn: '12h'
  });
};
