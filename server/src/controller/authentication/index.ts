import {Express} from 'express';

import {setup} from './utils';
import {jwtStrategy} from './strategies';

const pipe = (...strategies: Array<(app: Express) => Express>) => (
  app: Express
): Express => strategies.reduce((arg, fn) => fn(arg), app);

export const initializeAuthentication = (app: Express): void => {
  setup();

  pipe(jwtStrategy)(app);
};
