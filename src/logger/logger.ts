import { createLogger, format, transports } from 'winston';
import { Request, Response } from 'express';

const uuid = require('uuid').v4;

interface IErrorObject {
  error: Error | ExtendedError,
  res?: Response,
  req?: Request,
  exception?: boolean
}

class ExtendedError extends Error {
  statusCode: number;

  msg: string | ArrayBufferView;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.msg = message;
  }
}

const logFile = './logs/history.log';
const errorsFile = './logs/errors.log';

const logger = createLogger({
  exitOnError: false,

  transports: [
    new transports.Console({
      level: 'debug',
      format: format.combine(format.colorize(), format.cli()),
    }),
    new transports.File({
      filename: logFile,
      level: 'info',
      format: format.json(),
    }),
    new transports.File({
      filename: errorsFile,
      level: 'error',
      format: format.json(),
    }),
  ],
});

const errorLogger = (error: IErrorObject, res?: Response) => {
  if (error.error instanceof ExtendedError) {
    logger.log('error', {
      "ID": uuid(),
      "ERROR DATE": new Date(),
      "ERROR": error.error.msg,
      "STATUS CODE": error.error.statusCode,
    })
    res?.sendStatus(error.error.statusCode);
  } else {
    logger.log('error', {
      "ID": uuid(),
      "ERROR DATE": new Date(),
      "ERROR": error.error.message,
      "BODY": error.error
    })
    res?.sendStatus(500);
  }
};

const exceptionLogger = (error: Error) => {
  logger.log('error', {
    "Status": "SYSTEM CRASHED",
    "ID": uuid(),
    "ERROR MESSAGE": error.message,
    "DATE": new Date()
  })
  setTimeout(() => {
    process.exit(1);
  }, 1000)
};

export { logger, errorLogger, exceptionLogger, IErrorObject, ExtendedError };