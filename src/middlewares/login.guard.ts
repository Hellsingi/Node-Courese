import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from 'dotenv';

config.config();

import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class Guard implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body.secretPass && req.body.secretPass === process.env['JWT_SECRET_KEY']) {
      next();
    } else {
      if (req.headers.authorization) {
        const token = req.headers.authorization?.split(' ')[1];
        jwt.verify(token, process.env['JWT_SECRET_KEY'], (err) => {
          if (err) res.status(401).json({ error: err.message });
          next();
        });
      } else {
        res.status(401).json({ error: 'Unauthorized' });
      }
    }
  }
}
