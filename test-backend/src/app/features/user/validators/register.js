import { User } from '@app/models'
import { errorsMsg, schemas } from '@modules/validator'

const schema = {
  required: [
    'firstName',
    'lastName',
    'email',
    'password'
  ],
  properties: {
    firstName: {
      type: 'string',
      format: 'alpha'
    },
    lastName: {
      type: 'string',
      format: 'alpha'
    },
    email: {
      $ref: schemas.emailSchema.id,
    },
    password: {
      $ref: schemas.passwordSchema.id,
    }
  }
}

export const register = async (validator, { body }) => {
  const result = validator.validate(body, schema)

  if (result.valid) {
    const user = await User.findOne({
      where: { email: body.email }
    })

    if (user) {
      result.addError(`Email ${errorsMsg.ALREADY_TAKEN}`)
    }
  }

  return result
}
