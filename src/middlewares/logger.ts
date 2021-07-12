import { NextFunction, Request, Response } from 'express';
import { log } from './winston-logger';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    log.info(JSON.stringify({
      METHOD: req.method,
      URL: req.url,
      STATUS: res.statusCode,
      QUERY: req.query,
      PARAMS: req.params,
      BODY: req.body
    }));
    next();
  }
}
