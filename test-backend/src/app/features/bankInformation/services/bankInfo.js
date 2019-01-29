import { BankInformation } from '@app/models'
import fileManager from '@app/services/fileManager'
import uploadManager from '@app/services/uploadManager'
import createError from 'http-errors'

export default {

  /**
   * Create user bank information and relation Letter Of Credit if it exists
   */

  async create(user, data, files) {
    const banks = await user.getBankInformations({ raw: true })
    if (banks.length >= 5) {
      throw createError(422, 'You can\'t create more than 5 banks')
    }

    const bankInformation = await BankInformation.create(data)
    await user.addBankInformation(bankInformation)

    if (files) {
      const { file } = files
      const extension = file.name.split('.').pop()
      const letterOfCredit = await fileManager.create(file, extension)
      await uploadManager.move(letterOfCredit.name, file)
      await bankInformation.setLetterOfCredit(letterOfCredit)
    }

    return bankInformation
  },

  /**
   * Get full bank information of user
   */

  async getAll(user) {
    return await user.getBankInformations({
      attributes: { exclude: ['userId', 'updatedAt', 'letterOfCreditId'] },
      include: [{
        association: 'letterOfCredit',
        attributes: ['name', 'originalName'],
      }]
    })
  },

  /**
   * Remove bank information of user
   */

  async remove(id) {
    return await BankInformation.destroy({
      where: { id: id }
    })
  },

  /**
   * Update user bank information and relation Letter Of Credit if it exists
   */

  async update(user, data, files, oldData) {
    const bankInformation = await oldData.update(data)
    await user.addBankInformation(bankInformation)

    if (files) {
      const file = files.file
      const extension = file.name.split('.').pop()
      const letterOfCredit = await fileManager.create(file, extension)
      await uploadManager.move(letterOfCredit.name, file)
      await bankInformation.setLetterOfCredit(letterOfCredit)
    }

    return bankInformation
  }
}
