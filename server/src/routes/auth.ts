import {Router} from 'express';

import {checkJwt} from '../middleware/checkJwt';

import {login, changePassword, register} from '../controller/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/change-password', [checkJwt], changePassword);

export default router;
