import { authMiddleware as auth } from '@app/middleware'
import { withValidator } from '@modules/validator'

import * as routes from './routes'
import * as validators from './validators'

export default ({ app }) => {

  app.group('/me', (router) => {
    router.use(auth)

    router.get('/', routes.allUserInfo)
  })

  app.group('/user', (router) => {
    router.post('/login', withValidator(validators.login), routes.loginUser)
    router.post('/logout', auth, routes.logoutUser)

    router.post('/register', withValidator(validators.register),routes.registerUser)
  })
}
