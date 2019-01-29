import { bankInfoService } from '../services'

/**
 * @route POST /bank-information
 * @summary Create new bank information with relations
 */

export const addNewBank = async (req, res, next) => {
  const { body, files, user } = req
  try {
    const newBankInf = await bankInfoService.create(user, JSON.parse(body.newBankInf), files)
    res.json({ id: newBankInf.id })
  } catch (e) {
    next(e)
  }
}

/**
 * @route GET /bank-information
 * @summary Get bank information by id
 */

export const getBanksInfo = async (req, res) => {
  const { user } = req
  const listBankInfo = await bankInfoService.getAll(user)
  res.json(listBankInfo)
}

/**
 * @route DELETE /bank-information
 * @summary Remove bank information by id
 */

export const removeBankInfo = async (req, res) => {
  const removedId = req.params.id
  await bankInfoService.remove(removedId)
  res.json({ removedId })
}


/**
 * @route PUT /bank-information
 * @summary Update bank information by id
 */

export const updateBanksInfo = async (req, res) => {
  const { body, files, user, bankInformation } = req
  await bankInfoService.update(user, JSON.parse(body.newBankInf), files, bankInformation)
  res.json()
}
