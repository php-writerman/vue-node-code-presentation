import path from 'path'

const getEnvFileByMode = () => {
  switch (process.env.NODE_ENV) {
  case 'production':
    return '.env.production'
  default:
    return '.env'
  }
}

export default () => path.resolve(getEnvFileByMode())
