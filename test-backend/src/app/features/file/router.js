import * as routes from './routes'

export default ({ app }) => {
  app.group('/files', (router) => {
    router.get('/:file', routes.sendFile)
  })
}
