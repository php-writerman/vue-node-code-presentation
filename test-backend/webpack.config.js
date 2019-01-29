const path = require('path')
const rootDir = 'src'

module.exports = {
  rootDir,
  resolve: {
    alias: {
      '@app': path.resolve(rootDir, 'app'),
      '@modules': path.resolve(rootDir, 'modules'),
      '@test': path.resolve('test')
    }
  }
}
