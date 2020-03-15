import 'reflect-metadata';
import {createConnection, ConnectionOptions} from 'typeorm';
import express from 'express';
import {json, urlencoded} from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import fs from 'fs';
import path from 'path';
import routes from './routes';
import {initializeAuthentication} from './controller/authentication';

import DB_CONFIG from '../ormconfig.json';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3232;
const BUILD_FOLDER = 'build';

const STATIC = path.resolve(`${__dirname}/../..`, BUILD_FOLDER);
const INDEX = path.resolve(STATIC, 'index.html');

(async (): Promise<void> => {
  try {
    await createConnection(DB_CONFIG as ConnectionOptions);
    const app = express();

    app.use(urlencoded({extended: true}));
    app.use(cors({credentials: true}));
    app.use(helmet());
    app.use(json());
    app.use(cookieParser());
    app.use(passport.initialize());
    initializeAuthentication(app);

    if (!process.env.BASE_API_URL) {
      throw new Error('Missing BASE_API_URL');
    }

    app.use(process.env.BASE_API_URL, routes);
    if (fs.existsSync(BUILD_FOLDER)) {
      app.use(express.static(BUILD_FOLDER));
      app.use(RegExp(`^(?!${process.env.BASE_API_URL}.*$).*`), (req, res) => {
        res.sendFile(INDEX);
      });
      console.log(`Static server for ${BUILD_FOLDER} created`);
    }

    app.listen(PORT, (error: Error): void => {
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
