import {Router} from 'express';
import passport from 'passport';

import {register} from './controller/authentication/register';
import {login} from './controller/authentication/login';
import {logout} from './controller/authentication/logout';

import {listAllUsers, getUser} from './controller/user';

import {recordAttendance} from './controller/attendance';

const routes = Router();

// Authentication
const AUTHENTICATION_BASE = '/auth';
routes.post(`${AUTHENTICATION_BASE}/register`, register);
routes.post(`${AUTHENTICATION_BASE}/login`, login);
routes.get(`${AUTHENTICATION_BASE}/logout`, logout);

const allowOnlyAuthenticated = passport.authenticate('jwt');

// Users
const USER_BASE = '/user';
routes.get(USER_BASE, allowOnlyAuthenticated, listAllUsers);
routes.get(`${USER_BASE}/:userId`, allowOnlyAuthenticated, getUser);

// Attendance form
const ATTENDANCE_BASE = '/attendance';
routes.post(ATTENDANCE_BASE, allowOnlyAuthenticated, recordAttendance);

export default routes;
