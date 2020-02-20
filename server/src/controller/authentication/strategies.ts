import passport from 'passport';
import passportJWT, {VerifiedCallback} from 'passport-jwt';
import {Request, Express} from 'express';
import {getRepository} from 'typeorm';

import {signToken} from './utils';

import {User} from '../../entity/User';

const JWTStrategy = passportJWT.Strategy;

type JwtPayload = {
  data: User;
};

export const jwtStrategy = (app: Express): Express => {
  const strategyOptions = {
    jwtFromRequest: (req: Request): string => req.cookies.jwt,
    secretOrKey: process.env.JWT_SECRET,
    passReqToCallback: true
  };

  const verifyCallback = async (
    req: Request,
    jwtPayload: JwtPayload,
    cb: VerifiedCallback
  ): Promise<void> => {
    try {
      const userRepository = getRepository(User);
      const user = await userRepository.findOneOrFail(jwtPayload.data.id);
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  };

  passport.use(new JWTStrategy(strategyOptions, verifyCallback));

  return app;
};

export const login = (req: Request, user: User): Promise<string> => {
  return new Promise((resolve, reject) => {
    req.login(user, {session: false}, (err) => {
      if (err) {
        return reject(err.stack);
      }

      return resolve(signToken(user));
    });
  });
};
