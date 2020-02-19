import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

type SignedPayload = {
  userId: string;
  username: string;
};

export const checkJwt = (req: Request, res: Response, next: NextFunction): void => {
  //Get the jwt token from the head
  const token = req.headers['auth'] as string;
  let jwtPayload;

  if (!jwtSecret) {
    throw new Error('Missing JWT secret in environment variables.');
  }

  //Try to validate the token and get data
  try {
    jwtPayload = jwt.verify(token, jwtSecret) as SignedPayload;
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const {userId, username} = jwtPayload;
  const newToken = jwt.sign({userId, username}, jwtSecret, {
    expiresIn: '1h'
  });
  res.setHeader('token', newToken);

  //Call the next middleware or controller
  next();
};
