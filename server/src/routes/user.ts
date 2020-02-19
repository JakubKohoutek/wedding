import {Router} from 'express';

import {checkJwt} from '../middleware/checkJwt';
import {checkRole} from '../middleware/checkRole';

import {
  listAll,
  getOneById,
  newUser,
  editUser,
  deleteUser
} from '../controller/userController';

const router = Router();

router.get('/', /*[checkJwt, checkRole(['ADMIN'])], */ listAll);
router.get('/:id([0-9]+)', [checkJwt, checkRole(['ADMIN'])], getOneById);
router.post('/', [checkJwt, checkRole(['ADMIN'])], newUser);
router.patch('/:id([0-9]+)', [checkJwt, checkRole(['ADMIN'])], editUser);
router.delete('/:id([0-9]+)', [checkJwt, checkRole(['ADMIN'])], deleteUser);

export default router;
