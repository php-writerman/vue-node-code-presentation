import { createLogger, format, transports } from 'winston'
const { combine, timestamp, printf } = format

// cutsom logs formatter
const logFormat = printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`
})

const errorLogger = createLogger({
  level: 'error',
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    new transports.File({ filename: './logs/error.log', level: 'error' })
  ]
})

if (process.env.NODE_ENV === 'development' && process.env.TESTING === 'false') {
  errorLogger.add(new transports.Console())
}

export {
  errorLogger,
}
