import {Response} from 'express';
import ms from 'ms';

export const setJwtCookie = (res: Response, token: string): void => {
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: ms('12w')
  });
};

export const clearJwtCookie = (res: Response): void => {
  res.clearCookie('jwt');
};
