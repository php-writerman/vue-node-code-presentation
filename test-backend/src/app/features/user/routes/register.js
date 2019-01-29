import { userManager } from '@app/services'
import { userTransformer } from '../transformers'
import { UserSession } from '../../../models'
import uuid from 'uuid/v4'

/**
 * @route POST /user/register
 * @summary Register new user
 */

export const registerUser = async (req, res, next) => {
  try {
    const body = req.body
    const user = await userManager.create(body)
    const accessToken = uuid()
    const newSession =  await UserSession.create({ accessToken })
    await user.addUserSession(newSession)

    res.json({
      user: userTransformer.toView(user.get()),
      token: accessToken
    })
  } catch (err) {
    next(err)
  }
}
