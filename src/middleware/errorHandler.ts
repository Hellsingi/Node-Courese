import { Request, Response } from 'express';
import { errorLogger, exceptionLogger, IErrorObject, ExtendedError } from '../logger/logger';

const errorHandlerMiddleware = (error: IErrorObject, res?: Response) => {
  if (error.exception) {
    exceptionLogger(error.error);
  } else {
    errorLogger(error, res);
  }
}


const boardValidation = (req: Request) => {
  if (!req.body.title) {
    throw new ExtendedError(500, 'User name not provided.');
  }
}

const taskValidation = (req: Request) => {
  if (!req.body.title) {
    throw new ExtendedError(500, 'Task title not provided.');
  }
  if (!req.body.description) {
    throw new ExtendedError(500, 'Description for task are not provided.');
  }
}

const userValidation = (req: Request) => {
  if (!req.body.name) {
    throw new ExtendedError(500, 'User name not provided.');
  }
  if (!req.body.login || !req.body.password) {
    throw new ExtendedError(500, 'Login or Password are not provided.');
  }
}

export { errorHandlerMiddleware, userValidation, taskValidation, boardValidation };