import createError from 'http-errors'
import { errorLogger } from '../tools'

export default [
  // catch 404 and forward to error handler
  (req, res, next) => {
    next(createError(404))
  },

  // global error handler
  // eslint-disable-next-line no-unused-vars
  (error, req, res, next) => {
    errorLogger.error(error.stack)
    res
      .status(error.status || 500)
      .json({ error })
  },
]
