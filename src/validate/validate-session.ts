import jwt from "jsonwebtoken";
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import { getById } from "../resources/users/user.service";

interface IDecodeData {
  id: string,
  login: string
}

export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  const authorizationToken = req.headers.authorization;

  if (authorizationToken) {
    const [type, token] = authorizationToken.split(' ');
    if (type === 'Bearer') {
      try {
        const decoded = jwt.verify(token as string, process.env['JWT_SECRET_KEY'] as string) as IDecodeData;
        const user = await getById(decoded.id);
        if (user) {
          next();
          return;
        }
      } catch (err) {
        res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized user!');
      }

    }

  }
  res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized user!');
};