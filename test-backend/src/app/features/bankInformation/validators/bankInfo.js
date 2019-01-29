import moment from 'moment'

const schema = {
  properties: {
    name: {
      type: 'string',
      required: true
    },
    swiftCode: {
      type: 'string'
    },
    branchCode: {
      type: 'string',
      required: true
    },
    accountNumber: {
      type: 'string',
      required: true
    },
    amount: {
      type: 'integer',
      required: true
    },
    iban: {
      type: 'string',
      required: true
    },
    typeOfCredit: {
      type: 'string',
      required: true
    },
    issuedDate: {
      type: 'validDate',
      required: true
    },
    expiryDate: {
      type: 'validDate',
      required: true
    }
  }
}

export const validateBankInfo = async (validator, { body }) => {
  const bank = JSON.parse(body.newBankInf)
  const result = validator.validate(bank, schema)

  if (result.valid && moment(bank.issuedDate).isAfter(bank.expiryDate)) {
    result.addError('Issued date needs to be before expiry date')
  }

  return result
}
