import bcrypt from 'bcrypt'
import { User } from '../models'

export default {
  async create(data) {
    return User.create({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: bcrypt.hashSync(data.password, 10),
    })
  },

  comparePassword(user, password) {
    return bcrypt.compareSync(password, user.password)
  },
}
