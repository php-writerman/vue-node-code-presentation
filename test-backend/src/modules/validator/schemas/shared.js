
// The password string will start this way
// (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
// (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
// (?=.*[0-9])	The string must contain at least 1 numeric character
// (?=.[!@#$%^&*()[]{}<>-_=+])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
// (?=.{8,})	The string must be eight characters or longer
const passwordSchema = {
  id: '/PasswordSchema',
  type: 'string',
  pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*\\(\\)\\[\\]\\{\\}\\<\\>\\-\\_\\=\\+])(?=.{8,})(^\\S*$)'
}

const emailSchema = {
  id: '/EmailSchema',
  type: 'string',
  format: 'email',
  notDisposable: true,
}

const phoneSchema = {
  id: '/PhoneSchema',
  type: 'string',
  pattern: '^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$',
}

const companyAddressSchema = {
  id: '/CompanyAddress',
  type: 'object',
  required: [
    'city',
    'zip',
    'district',
    'address1',
  ],
  properties: {
    city: {
      type: 'string',
      notEmpty: true
    },
    zip: {
      type: 'string',
      notEmpty: true,
      onlyDigits: true,
      maxLength: 5,
    },
    district: {
      type: 'string',
      notEmpty: true,
    },
    address1: {
      type: 'string',
      notEmpty: true
    },
    address2: {
      type: 'string'
    }
  }
}

export {
  companyAddressSchema,
  passwordSchema,
  emailSchema,
  phoneSchema,
}
