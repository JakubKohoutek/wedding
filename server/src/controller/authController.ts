import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {getRepository} from 'typeorm';
import {validate} from 'class-validator';

import {User} from '../entity/User';

import {login as loginStrategy} from './authentication/strategies';

const jwtSecret = process.env.JWT_SECRET;

export const register = async (req: Request, res: Response): Promise<void> => {
  const {username, email, password} = req.body;
  console.log(username, email, password);

  const user = new User();

  user.username = username;
  user.password = password;
  user.email = email;
  user.role = 'guest';

  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  user.hashPassword();

  try {
    const userRepository = getRepository(User);
    await userRepository.save(user);
  } catch (e) {
    console.error(e);
    res.status(409).send('username already in use');
    return;
  }

  const token = await loginStrategy(req, user);

  res
    .status(201)
    .cookie('jwt', token, {
      httpOnly: true
    })
    .send('successfully registered');
  return;
};

export const login = async (req: Request, res: Response): Promise<void> => {
  //Check if username and password are set
  const {username, password} = req.body;
  if (!(username && password)) {
    res.status(400).send();
  }

  //Get user from database
  const userRepository = getRepository(User);
  let user: User;
  try {
    user = await userRepository.findOneOrFail({where: {username}});
  } catch (error) {
    res.status(401).send();
    return;
  }

  //Check if encrypted password match
  if (!user.checkIfUnencryptedPasswordIsValid(password)) {
    res.status(401).send();
    return;
  }

  if (!jwtSecret) {
    throw new Error('Missing JWT secret in environment variables.');
  }

  //Sing JWT, valid for 1 hour
  const token = jwt.sign({userId: user.id, username: user.username}, jwtSecret, {
    expiresIn: '1h'
  });

  //Send the jwt in the response
  res.send(token);
};

export const changePassword = async (req: Request, res: Response): Promise<void> => {
  //Get ID from JWT
  const id = res.locals.jwtPayload.userId;

  //Get parameters from the body
  const {oldPassword, newPassword} = req.body;
  if (!(oldPassword && newPassword)) {
    res.status(400).send();
  }

  //Get user from the database
  const userRepository = getRepository(User);
  let user: User;
  try {
    user = await userRepository.findOneOrFail(id);
  } catch (id) {
    res.status(401).send();
    return;
  }

  //Check if old password matchs
  if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
    res.status(401).send();
    return;
  }

  //Validate de model (password lenght)
  user.password = newPassword;
  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }
  //Hash the new password and save
  user.hashPassword();
  userRepository.save(user);

  res.status(204).send();
};
