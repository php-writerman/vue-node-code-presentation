import createError from 'http-errors'
import { createValidator, ValidationError } from './'

export const withValidator = (validateCb) => {
  const validator = createValidator()

  if (typeof validateCb !== 'function') {
    throw new Error('Your must pass \'validateCb\' function to validate middleware')
  }

  return async (req, res, next) => {
    try {
      const result = await validateCb(validator, req)
      if (result === null) {
        return next(createError(404))
      }

      if (result.valid) {
        return next()
      }

      next(ValidationError(result.errors))
    } catch (err) {
      next(err)
    }
  }
}
