import createError from 'http-errors'
import models from '@app/models'
import { capitalizeFirstLetter } from '@app/utils'

const defaultModelLoader = (id, modelClass) => modelClass.findById(id)

/**
 * Middleware, helps to bind model instance from DB by id to each request
 * @param modelName
 * @param param
 * @param findModelCb
 * @returns {Function}
 */
export default ({ modelName, param, loadCb = defaultModelLoader }) => {
  const modelClass = models[modelName]
  if (!modelClass) {
    throw new Error(`Model Binder: could not find model class for '${modelName}'`)
  }

  const notFoundErr = createError(404, `${capitalizeFirstLetter(param)} not found`)

  return async (req, res, next, id) => {
    const instance = await loadCb(id, modelClass)

    if (instance) {
      req[param] = instance
      return next()
    }

    next(notFoundErr)
  }
}
