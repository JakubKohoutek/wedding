import {Request, Response} from 'express';
import {getRepository} from 'typeorm';

import {User, UserDTO} from '../../entity/User';

export const listAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRepository = getRepository(User);
    const users = await userRepository.find({});

    const usersDTO = users.map(
      (user): UserDTO => ({
        username: user.username,
        email: user.email,
        id: user.id
      })
    );

    res.status(200).send(usersDTO);
  } catch (error) {
    console.error(error);

    res.status(500).send({error: error.message});
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.params.userId) {
      throw new Error('Missing user ID.');
    }

    const userId = parseInt(req.params.userId, 10);
    const userRepository = getRepository(User);
    const foundUser = await userRepository.findOneOrFail({
      id: userId
    });

    const userDTO: UserDTO = {
      username: foundUser.username,
      email: foundUser.email,
      id: foundUser.id
    };

    res.status(200).send(userDTO);
  } catch (error) {
    console.error(error);

    res.status(500).send({error: error.message});
  }
};
