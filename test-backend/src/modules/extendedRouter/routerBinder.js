import bindModel from './bindModelMiddleware'

export const createRouterBinder = config => (router) => {
  config.forEach(({ param, modelName, loadCb }) => {
    router.param(param, bindModel({ modelName, param, loadCb }))
  })
}
