import createError from 'http-errors'
import { normalizeErrors } from '.'

const mapValidationErrors = errors => (
  errors.reduce((acc, error) => ({
    ...acc,
    [error.property]: error.stack
  }), {})
)

export const ValidationError = errors => (
  createError(422, 'Request data is not valid', {
    fields: mapValidationErrors(normalizeErrors(errors))
  })
)
