const moduleAlias = require('module-alias')
const webpackConfig = require('./webpack.config')

const mapObject = (cb, obj) => Object.entries(obj).reduce((acc, [key, value]) => ({
  ...acc, [key]: cb(value, key)
}), {})

const rootDir = process.env.ROOT_DIR

const aliases = mapObject(
  aliasPath => aliasPath.replace(webpackConfig.rootDir, rootDir),
  webpackConfig.resolve.alias
)

moduleAlias.addAliases(aliases)
