import winston, { format } from 'winston';
import { env } from '../config/env.js';

export const createLogger = (name: string) => {
  const myFormat = format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.label({ label: name }),
      winston.format.errors(),
      winston.format.json()
    ),
    defaultMeta: { service: name },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
      }),
      new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
  });

  if (env.NODE_ENV !== 'production') {
    logger.add(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.label({ label: name }),
          winston.format.colorize(),
          winston.format.errors(),
          myFormat
        ),
      })
    );
  }

  return logger;
};
