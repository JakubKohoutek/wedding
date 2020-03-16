import {Request, Response} from 'express';

import {clearJwtCookie} from '../../utils/cookies';

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    req.logout();

    clearJwtCookie(res);
    res.status(200).send();
  } catch (error) {
    console.error(error);

    res.status(500).send();
  }
};
