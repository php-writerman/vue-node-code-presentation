import fs from 'fs'
import { appStorage } from '../tools'
import { noop } from '@app/utils'
import uuid from 'uuid/v4'

/**
 * @typedef File
 * @property {integer} id
 * @property {string} name
 * @property {string} mimeType
 * @property {string} originalName
 */
export default (sequelize, DataTypes) => {
  const File = sequelize.define('file', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuid()
    },
    name: DataTypes.STRING,
    mimeType: DataTypes.STRING,
    originalName: DataTypes.STRING,
    url:DataTypes.STRING(255)
  })

  File.beforeDestroy((file) => {
    fs.unlink(appStorage.uploadPath(file.name), noop)
  })

  return File
}
