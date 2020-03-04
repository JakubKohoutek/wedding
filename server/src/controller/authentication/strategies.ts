import passport from 'passport';
import passportJWT, {VerifiedCallback} from 'passport-jwt';
import {Request, Express} from 'express';
import {getRepository} from 'typeorm';

import {signToken} from './utils';

import {User, UserDTO} from '../../entity/User';

const JWTStrategy = passportJWT.Strategy;

type JwtPayload = {
  data: UserDTO;
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
      return cb(null, {
        username: user.username,
        email: user.email,
        id: user.id
      });
    } catch (err) {
      return cb(err);
    }
  };

  passport.use(new JWTStrategy(strategyOptions, verifyCallback));

  return app;
};

export const loginUser = (req: Request, user: UserDTO): Promise<string> =>
  new Promise((resolve, reject) => {
    req.login(user, {session: false}, (err) => {
      if (err) {
        return reject(err.stack);
      }

      const token = signToken(user);

      return resolve(token);
    });
  });
