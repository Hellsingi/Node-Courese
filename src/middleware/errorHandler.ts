import { Response } from 'express';
import { errorLogger, exceptionLogger, IErrorObject } from '../logger/logger';

const errorHandlerMiddleware = (error: IErrorObject, res?: Response) => {
  if (error.exception) {
    exceptionLogger(error.error);
  } else {
    errorLogger(error, res);
  }
}

export { errorHandlerMiddleware };