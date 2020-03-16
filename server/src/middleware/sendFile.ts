import {Request, Response} from 'express';

export const sendFile = (filePath: string) => (req: Request, res: Response): void => {
  res.sendFile(filePath);
};
