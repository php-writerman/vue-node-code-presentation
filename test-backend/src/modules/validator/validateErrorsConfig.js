import errorsMsg from './errorsMsg'
import { updateError } from './utils'

export default [
  {
    schema: '/PasswordSchema',
    name: 'pattern',
    mapper: updateError({ message: errorsMsg.INVALID }),
  },
  {
    schema: '/EmailSchema',
    name: 'pattern',
    mapper: updateError({ message: errorsMsg.INVALID }),
  },
  {
    schema: '/PhoneSchema',
    name: 'pattern',
    mapper: updateError({ message: errorsMsg.INVALID_PHONE }),
  },
  {
    name: 'format',
    argument: 'alpha',
    mapper: updateError({ message: errorsMsg.ONLY_LETTERS }),
  },
  {
    name: 'format',
    argument: 'email',
    mapper: updateError({ message: errorsMsg.INVALID })
  },
]
