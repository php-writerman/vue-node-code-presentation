import authMiddleware from '@app/middleware/auth'
import * as routes from './routes'
import * as validators from './validators'
import { withValidator } from '@modules/validator'

export default ({ app }) => {
  app.group('/bank-information', (router) => {
    router.use(authMiddleware)
    // create new bank information
    router.post('/', withValidator(validators.validateBankInfo), routes.addNewBank)
    // get all bank information
    router.get('/', routes.getBanksInfo)
    // remove bank information
    router.delete('/:id', routes.removeBankInfo)
    // update bank information
    router.put('/:bankInformation', routes.updateBanksInfo)
  })
}
