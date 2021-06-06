import { createLogger, format, transports } from 'winston';

const logFile = './logs/history.log';

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
  ],
});

export { logger };