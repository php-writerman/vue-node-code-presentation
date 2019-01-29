import createError from 'http-errors'
import { User, UserSession } from '../models'

export default async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(createError(401))
  }

  const token = req.headers.authorization
  try {
    const user = await User.findOne({
      include:[
        {
          model : UserSession,
          where: { accessToken: token }
        },
      ]
    })

    if (!user) {
      return next(createError(401))
    }

    // save user to request
    req.user = user

    return next()
  } catch (err) {
    return res.status(401).end()
  }
}
