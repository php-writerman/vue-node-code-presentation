/**
 * Adds route groups functionality to express.js
 * @param express
 * @param bind - adds model auto-binding from request params
 * to specific router
 */
export default (express, bind) => {
  express.application.group = express.Router.group = function(path, fn) {
    const router = express.Router()
    bind(router)
    fn(router)

    this.use(path, router)
    return router
  }
}
