import fs from 'fs'

/**
 * Promisifies version of fs.stat method,
 * to check if file exists in file system
 * @param path
 * @returns {Promise<any>}
 */
export const fileExists = path => new Promise((res) => {
  fs.stat(path, (err) => {
    if (err) res(false)
    res(true)
  })
})
