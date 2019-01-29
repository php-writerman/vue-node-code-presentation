import '../src/app/tools/loadEnv'
import '../register-aliases'
import syncDb from '../src/app/tools/syncDb'

syncDb().then(() => process.exit())
