import fs from 'fs'
import { appStorage } from '../../app/tools'

const getDisposableEmailList = () => {
  const fileData = fs.readFileSync(appStorage.sharedPath('DAE.txt'), { encoding: 'UTF-8' })
  return fileData.split('\n').map(item => item.replace('\r', ''))
}

const disposableEmailList = getDisposableEmailList()

const isEmailDisposable = (email) => {
  const parts = email.split('@')
  return disposableEmailList.includes(parts[1])
}

export {
  isEmailDisposable,
}
