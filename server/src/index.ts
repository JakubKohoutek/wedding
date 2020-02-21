import 'reflect-metadata';
import {createConnection, ConnectionOptions} from 'typeorm';
import express from 'express';
import {json, urlencoded} from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import routes from './routes';

import DB_CONFIG from '../ormconfig.json';

const PORT = 3232;

(async (): Promise<void> => {
  try {
    await createConnection(DB_CONFIG as ConnectionOptions);
    const app = express();

    app.use(urlencoded({extended: true}));
    app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
    app.use(helmet());
    app.use(json());
    app.use(cookieParser());
    app.use(passport.initialize());

    if (!process.env.BASE_API_URL) {
      throw new Error('Missing BASE_API_URL');
    }

    app.use(process.env.BASE_API_URL, routes);

    app.listen(PORT, (error): void => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(`Express server has started at port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
