import 'reflect-metadata';
import {createConnection} from 'typeorm';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';

const PORT = 3232;

(async (): Promise<void> => {
  try {
    await createConnection();
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

// await connection.manager.save(connection.manager.create(User, {
//     firstName: "Timber",
//     lastName: "Saw",
//     age: 27
// }));
// await connection.manager.save(connection.manager.create(User, {
//     firstName: "Phantom",
//     lastName: "Assassin",
//     age: 24
// }));
