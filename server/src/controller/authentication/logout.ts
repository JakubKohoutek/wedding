import {Request, Response} from 'express';

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    req.logout();

    res.status(200).cookie('jwt', '', {
      httpOnly: true
    });
  } catch (error) {
    console.error(error);

    res.status(500).send();
  }
};
