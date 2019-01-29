import { SchemaError } from 'jsonschema'

const checkSchemaType = (type) => (attribute, schema) => {
  if (typeof schema[attribute] !== type) {
    throw new SchemaError(`"${attribute}" expects ${type}`, schema)
  }
}

const isBooleanOrThrow = checkSchemaType('boolean')

const updateError = data => err => {
  Object.entries(data).map(([key, value]) => {
    err[key] = value
  })
  return err
}

export {
  isBooleanOrThrow,
  updateError,
}
