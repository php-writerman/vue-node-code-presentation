import { isBooleanOrThrow } from './utils'
import { isEmailDisposable } from './disposableEmail'
import errorsMsg from './errorsMsg'

const strIsEmpty = str => str.trim().length === 0

const notEmpty = (instance, schema) => {
  if (typeof instance !== 'string') return
  isBooleanOrThrow('notEmpty', schema)

  if (schema.notEmpty && strIsEmpty(instance)) {
    return errorsMsg.NOT_BE_EMPTY
  }
}

const notDisposable = (instance, schema) => {
  if (typeof instance !== 'string') return
  isBooleanOrThrow('notDisposable', schema)

  // if instance is empty we consider it is valid
  if (!strIsEmpty(instance)) {
    if (schema.notDisposable && isEmailDisposable(instance)) {
      return errorsMsg.DISPOSABLE
    }
  }
}

const notNull = (instance, schema) => {
  isBooleanOrThrow('notNull', schema)
  if (schema.notNull && instance === null) {
    return errorsMsg.IS_NULL
  }
}

const onlyDigits = (instance, schema) => {
  if (typeof instance !== 'string') return
  isBooleanOrThrow('onlyDigits', schema)

  if (schema.onlyDigits && !(/^[0-9]*$/).test(instance)) {
    return errorsMsg.ONLY_DIGITS
  }
}

export default {
  notNull,
  notEmpty,
  onlyDigits,
  notDisposable,
}
