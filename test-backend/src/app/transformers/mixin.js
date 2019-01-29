import { only, except } from '@modules/transform'
import { exceptTimestamps } from '@app/transformers'

export const transformerMixin = (Class) => {
  Class.prototype.transform = function (transformer) {
    return transformer(this.get())
  }

  Class.prototype.exceptTimestamps = function () {
    return exceptTimestamps(this.get())
  }

  Class.prototype.except = function (...attributes) {
    return except(...attributes)(this.get())
  }

  Class.prototype.only = function (...attributes) {
    return only(...attributes)(this.get())
  }
}

export const requestMixin = (Class) => {
  Class.all = function () {
    return {
      ...this.params,
      ...this.query,
      ...this.body
    }
  }

  Class.only = function (...attributes) {
    return only(...attributes)(this.all())
  }

  Class.except = function (...attributes) {
    return except(...attributes)(this.all())
  }
}
