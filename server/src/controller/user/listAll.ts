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
