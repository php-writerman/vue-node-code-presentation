import { appStorage } from '../tools'

export default {
  async move(fileName, uploadedFile) {
    return uploadedFile.mv(appStorage.uploadPath(fileName))
  }
}
