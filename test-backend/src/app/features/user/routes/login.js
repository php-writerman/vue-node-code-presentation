import passport from 'passport'
import { UserSession } from '@app/models'

/**
 * @route POST /user/login
 * @summary Authenticate user and create access token
 */

export const loginUser = async (req, res, next) => {
  return passport.authenticate('local-login', (err, accessToken) => {
    if (err) {
      return res.status(400).json({
        error: { message: err.message }
      })
    }

    return res.json({
      token: accessToken
    })
  })(req, res, next)
}

/**
 * @route POST /user/logout
 * @summary Remove access token, on user log out
 */

export const logoutUser = async (req, res, next) => {
  try {
    await UserSession.destroy({
      where: { accessToken: req.headers.authorization }
    })
  } catch (e) {
    next(e)
  }

  res.json()
}
