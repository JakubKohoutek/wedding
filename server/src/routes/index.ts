import {Router} from 'express';

import {register} from '../controller/authentication/register';
import {login} from '../controller/authentication/login';
import {logout} from '../controller/authentication/logout';

import {listAllUsers} from '../controller/user/listAll';

const routes = Router();

// Authentication
const AUTHENTICATION_BASE = '/auth';
routes.post(`${AUTHENTICATION_BASE}/register`, register);
routes.post(`${AUTHENTICATION_BASE}/login`, login);
routes.get(`${AUTHENTICATION_BASE}/logout`, logout);

// Users
const USER_BASE = '/user';
routes.get(USER_BASE, listAllUsers);

export default routes;
