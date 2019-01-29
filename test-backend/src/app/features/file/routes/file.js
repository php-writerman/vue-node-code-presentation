import createError from 'http-errors'
import { appStorage } from '@app/tools'

/**
 * @route GET /files/:file
 * @summary Get file if it's exist
 */

export const sendFile = async (req, res, next) => {
  const { file } = req

  try {
    const fileFullPath = appStorage.uploadPath(file.name)
    res.download(fileFullPath, file.originalName, {}, (err) => {
      if (err) {
        if (err.code === 'ENOENT') {
          return next(createError(404, 'File not exists'))
        }
        next(err)
      }
    })
  } catch (err) {
    next(err)
  }
}
