import { Validator } from 'jsonschema'
import * as schemas from './schemas/shared'
import attributes from './attributes'
import formats from './formats'


const createValidator = () => {
  const instance = new Validator()

  // add custom formats
  Object.entries(formats).forEach(([name, format]) => {
    instance.customFormats[name] = format
  })

  // add custom attributes
  Object.entries(attributes).forEach(([name, attribute]) => {
    instance.attributes[name] = attribute
  })
  // add custom schemas
  Object.values(schemas).forEach(schema => {
    instance.addSchema(schema)
  })

  return instance
}

export {
  createValidator,
}
