import { Strategy } from 'passport-local'
import uuid from 'uuid/v4'

import {
  User
} from '../models'

import {
  userManager
} from '@app/services'
import { UserSession } from '@app/models'


export default new Strategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, async (req, email, password, done) => {

  const user = await User.findOne({
    where: { email }
  })

  if (!user) {
    const error = new Error('Incorrect credentials')
    error.name = 'IncorrectCredentialsError'

    return done(error)
  }

  const isMatch = userManager.comparePassword(user, password)

  if (!isMatch) {
    const error = new Error('Incorrect credentials')
    error.name = 'IncorrectCredentialsError'

    return done(error)
  }

  const accessToken = uuid()

  const newSession =  await UserSession.create({ accessToken })
  await user.addUserSession(newSession)

  return done(null, accessToken, {
    user,
  })
})
