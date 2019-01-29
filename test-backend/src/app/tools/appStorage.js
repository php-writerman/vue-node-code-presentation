import { pathsConfig as paths } from '../config'

/**
 * This helper uses for accessing static data from storage directory
 */
export default {
  uploadPath(fileName) {
    return `${paths.uploadsFolder}/${fileName}`
  },
  sharedPath(fileName) {
    return `${paths.sharedFolder}/${fileName}`
  },
}
