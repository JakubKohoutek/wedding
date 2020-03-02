import {Router} from 'express';

import {register} from '../controller/register';
import {login} from '../controller/login';

import user from './user';

const routes = Router();

const AUTHENTICATION_BASE = '/auth';
routes.post(`${AUTHENTICATION_BASE}/register`, register);
routes.post(`${AUTHENTICATION_BASE}/login`, login);

routes.use('/user', user);

export default routes;
