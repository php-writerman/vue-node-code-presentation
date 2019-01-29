import bcrypt from 'bcrypt'
import { User } from '../models'
import { dbUtils } from '../utils'

const { createIfNotExists } = dbUtils

const seedUser = async () => {
  return await createIfNotExists(User, {
    firstName: 'Sneaky',
    lastName: 'Raven',
    mobilePhone: '+380111111111',
    email: 'sneakyraven0@gmail.com',
    password: bcrypt.hashSync('aaaaaA1@', 10)
  }, 'email')
}

export default async () => {
  await seedUser()
}
