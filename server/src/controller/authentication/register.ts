import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {validate} from 'class-validator';

import {User, UserDTO} from '../../entity/User';

import {loginUser} from './strategies';

export const register = async (req: Request, res: Response): Promise<void> => {
  const {username, email, password} = req.body;

  const user = new User();

  user.username = username;
  user.password = password;
  user.email = email;
  user.role = 'guest';

  const errors = await validate(user);
  if (errors.length > 0) {
    const sanitizedErrors = errors.map((error) => ({
      field: error.property,
      error: Object.values(error.constraints)[0]
    }));

    res.status(400).send({errors: sanitizedErrors});
    return;
  }

  user.hashPassword();

  try {
    const userRepository = getRepository(User);
    await userRepository.save(user);
  } catch (e) {
    console.error(e);
    res.status(409).send({
      errors: [
        {
          field: 'username',
          error: 'Uživatel s tímto jménem už existuje'
        }
      ]
    });
    return;
  }

  const userData: UserDTO = {
    username: user.username,
    email: user.email,
    id: user.id
  };

  const token = await loginUser(req, userData);

  res
    .status(201)
    .cookie('jwt', token, {
      maxAge: 900000,
      httpOnly: true
    })
    .send(userData);
  return;
};
