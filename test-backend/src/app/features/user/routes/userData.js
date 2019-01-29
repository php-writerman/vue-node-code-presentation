import userRepo from '../repository'

/**
 * @route GET /me
 * @summary Get actual user information
 */

export const allUserInfo = async (req, res) => {
  const userId = req.user.id
  const user = await userRepo.getOneWithRelatedData(userId)

  res.json(user)
}
