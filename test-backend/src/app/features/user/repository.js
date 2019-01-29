import {
  User
} from '@app/models'

export default {
  async getOneWithRelatedData(userId) {
    return User.findOne({
      where: { id: userId },
      attributes: {
        exclude: User.rules.excluded
      }
    })
  }
}
