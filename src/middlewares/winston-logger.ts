import { createLogger, format, transports } from 'winston';

const alignedWithColorsAndTime = format.combine(
  format.colorize(),
  format.printf(info => `${info.level}: ${info.message}`)
);
export const log = createLogger({
  format: alignedWithColorsAndTime,
  transports: [
    new transports.Console(),
    new transports.File({
      format: format.printf(info => `error:${info.message}`),
      filename: 'error.log',
      level: 'error'
    }),
    new transports.File({
      format: format.printf(info => {
        return `LOG:${info.message}`;
      }),
      filename: 'combined.log',
      level: 'info'
    })
  ]
});
