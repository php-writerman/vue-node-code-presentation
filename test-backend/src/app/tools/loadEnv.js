import dotenv from 'dotenv'
import getEnvFile from '../services/getEnvFile'

dotenv.config({ path: getEnvFile() })
dotenv.load()
