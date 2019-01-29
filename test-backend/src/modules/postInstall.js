const fs = require('fs')

// this script will create some needed folders on app startup
const foldersToCreate = [
  './logs',
  './src/app/migrations',
  './storage/uploads',
]

foldersToCreate.forEach((folderToCreate) => {
  if (!fs.existsSync(folderToCreate)) {
    fs.mkdirSync(folderToCreate)
  }
})
