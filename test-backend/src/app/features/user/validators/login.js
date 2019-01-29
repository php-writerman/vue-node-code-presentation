import { schemas } from '../../../../modules/validator'

export const loginSchema = {
  required: [
    'email',
    'password'
  ],
  properties: {
    email: {
      $ref: schemas.emailSchema.id,
    },
    password: {
      $ref: schemas.passwordSchema.id,
    }
  }
}

export const login = (validator, { body }) => {
  return validator.validate(body, loginSchema)
}
