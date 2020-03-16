import 'reflect-metadata';
import fs from 'fs';
import path from 'path';
import {createConnection, ConnectionOptions} from 'typeorm';
import express from 'express';
import {json, urlencoded} from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import passport from 'passport';

import routes from './routes';
import {initializeAuthentication} from './controller/authentication';
import {sendFile} from './middleware/sendFile';

import DB_CONFIG from '../ormconfig.json';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3232;
const BASE_API_URL = process.env.BASE_API_URL || '/api';
const BUILD_FOLDER = 'build';
const INDEX_FILE = path.resolve(`${__dirname}/../..`, BUILD_FOLDER, 'index.html');

(async (): Promise<void> => {
  try {
    // Connect to the database
    await createConnection(DB_CONFIG as ConnectionOptions);

    // Create express server
    const app = express();

    // Add middleware
    app.use(urlencoded({extended: true}));
    app.use(cors({credentials: true}));
    app.use(helmet());
    app.use(json());
    app.use(cookieParser());
    app.use(passport.initialize());
    initializeAuthentication(app);

    // Serve API endpoints
    app.use(BASE_API_URL, routes);

    // Serve static content if the build folder exists
    if (fs.existsSync(BUILD_FOLDER)) {
      app.use(express.static(BUILD_FOLDER));
      // Solve server routing of SPA - resolve all requests other than API requests with index.html file
      app.use(RegExp(`^(?!${BASE_API_URL}.*$).*`), sendFile(INDEX_FILE));
      console.log(`Static server for ${BUILD_FOLDER} created`);
    }

    // listen on the required port
    app.listen(PORT, (error?: Error): void => {
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
