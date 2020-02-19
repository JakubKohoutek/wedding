import 'reflect-metadata';
import {createConnection, ConnectionOptions} from 'typeorm';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

import routes from './routes';

import DB_CONFIG from '../ormconfig.json';

const PORT = 3232;

(async (): Promise<void> => {
  try {
    await createConnection(DB_CONFIG as ConnectionOptions);
    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    app.use('/', routes);

    app.listen(PORT, () => {
      app._router.stack.forEach(function(r: {route?: {path?: string}}) {
        if (r.route && r.route.path) {
          console.log(r.route.path);
        }
      });

      console.log(`Express server has started at port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
