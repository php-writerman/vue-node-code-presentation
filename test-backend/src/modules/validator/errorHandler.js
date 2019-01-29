import { ValidationError } from 'jsonschema'
import { capitalizeFirstLetter } from '../../app/utils'
import errorHandlersMap from './validateErrorsConfig'

const normalizeErrorProperty = prop => {
  // override validator standart property naming
  // remove instance part, and capitalize first letter
  return prop.split('.').filter(p => p !== 'instance').join(' ')
}

ValidationError.prototype.normalize = function normalize() {
  this.property = normalizeErrorProperty(this.property)
  const handler = findErrorHandler(this)
  const mappedError = handler ? handler.mapper(this) : this
  mappedError.stack = `${capitalizeFirstLetter(mappedError.property)} ${mappedError.message}`
  return mappedError
}

const findErrorHandler = (() => {
  const matchIfUndefinedOrEqual = (param, otherParam) => param === undefined ? true : param === otherParam
  const comparator = error => (o) => {
    const nameMatch = matchIfUndefinedOrEqual(o.name, error.name)
    const schemaMatch = matchIfUndefinedOrEqual(o.schema, error.schema)
    const argumentMatch = matchIfUndefinedOrEqual(o.argument, error.argument)

    return schemaMatch && nameMatch && argumentMatch
  }

  return (error) => {
    return errorHandlersMap.find(comparator(error))
  }
})()

// TODO: check if babel properly handle isntanceof checks
const normalizeErrors = errors => errors.map(err => {
  return err instanceof ValidationError ? err.normalize() : err
})

export {
  normalizeErrors,
}
