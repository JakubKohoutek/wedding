import {Router} from 'express';

import {checkJwt} from '../middleware/checkJwt';

import {login, changePassword} from '../controller/authController';

const router = Router();

router.post('/login', login);
router.post('/change-password', [checkJwt], changePassword);

export default router;
