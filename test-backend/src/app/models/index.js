import fs from 'fs'
import path from 'path'
import Sequelize, { Model } from 'sequelize'
import { dbConfig } from '../config'
import { transformerMixin } from '../transformers'

transformerMixin(Model)

const basename = path.basename(__filename)
const env = process.env.NODE_ENV
const config = dbConfig[env]

const db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true
  },
  operatorsAliases: false,
  logging: false
})

const defaultModelRules = (Model) => {
  const attributes = Object.keys(Model.attributes)
  // INFO: excluded, included rules can be used in queries
  // for modify result structure
  return {
    excluded: [],
    // for default we mark all attributes are included
    included: attributes,
  }
}

const buildModel = (model) => {
  // add associations to model
  if (model.associate) {
    model.associate(db)
  }

  // add rules to model
  // merge default model rules with custom ones
  const { rules = {} } = model
  model.rules = {
    ...defaultModelRules(model),
    ...rules
  }
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach((fileName) => {
    const model = sequelize['import'](path.join(__dirname, fileName))
    const modelName = fileName.replace('.js', '')
    db[modelName] = model
  })

Object.keys(db).forEach(modelName => {
  buildModel(db[modelName])
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
