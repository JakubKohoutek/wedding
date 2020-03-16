import {Request, Response} from 'express';
import {getRepository} from 'typeorm';

import {User, UserDTO} from '../../entity/User';

import {loginUser} from './strategies';

import {setJwtCookie} from '../../utils/cookies';

const jwtSecret = process.env.JWT_SECRET;

export const login = async (req: Request, res: Response): Promise<void> => {
  const {email, password} = req.body;
  const errors = [];

  if (!jwtSecret) {
    throw new Error('Missing JWT secret in environment variables.');
  }

  if (!email) {
    errors.push({
      field: 'email',
      error: 'Email nesmí být prázdný'
    });
  }

  if (!password) {
    errors.push({
      field: 'password',
      error: 'Heslo nesmí být prázdné'
    });
  }

  if (errors.length > 0) {
    res.status(400).send({
      errors
    });
    return;
  }

  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOneOrFail({where: {email}});
    if (!user.passwordIsValid(password)) {
      throw new Error(`${user.username} inserted wrong password`);
    }

    const userData: UserDTO = {
      username: user.username,
      email: user.email,
      id: user.id
    };

    const token = await loginUser(req, userData);
    setJwtCookie(res, token);

    res.status(200).send(userData);
  } catch (error) {
    console.error(error);
    errors.push({
      field: 'password',
      error: 'Nesprávné jméno nebo heslo'
    });

    res.status(401).send({errors});
  }
};
