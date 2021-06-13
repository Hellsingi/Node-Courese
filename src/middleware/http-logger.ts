import moment from 'moment';
import { finished } from 'stream';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../logger/logger';

const httpLogger = (req: Request, res: Response, next: NextFunction): void => {
  const { method, originalUrl, body, query } = req;
  const start = Date.now();

  next();

  finished(res, () => {
    const ms = Date.now() - start;
    const { statusCode } = res;
    if (statusCode <= 230) {
      logger.info(
        `
      "TIME": ${moment().format('YYYY-MM-DD hh:mm:ss')}
      "METHOD": ${method},
      "URL": ${decodeURI(originalUrl)},
      'QUERY PARAMETERS': ${JSON.stringify(query)},
      "BODY": ${JSON.stringify(body)},
      "STATUS CODE": ${statusCode}
      "EXECUTION TIME": [${ms}ms]`
      );
    }
  });
};

export { httpLogger };