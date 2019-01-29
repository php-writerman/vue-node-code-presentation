import uuid from 'uuid/v4'
import { File } from '../models'

export default {
  /**
   * Creates new File model instance in DB
   * and moves updloaded file to upload storage
   * @param uploadedFile
   * @returns {Promise<*>}
   */
  async create(uploadedFile, extension) {
    const ext = extension ? '.' + extension : ''
    const uniqueName = uuid()
    return File.create({
      name: uniqueName + ext,
      mimeType: uploadedFile.mimetype,
      originalName: uploadedFile.name,
    })
  },

  async createMany(uploadedFiles) {
    await Promise.all(uploadedFiles.map(this.create))
  },

  remove(file) {
    return file.destroy()
  }
}
