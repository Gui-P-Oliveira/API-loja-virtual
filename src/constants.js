import 'dotenv/config'

export const PORT = process.env.PORT
export const MONGO_URL = process.env.MONGO_URL
export const SALT = Number(process.env.SALT)
export const MAX_FILE_SIZe = 1024 * 100
export const LOG_LEVEL = process.env.LOG_LEVEL
export const THIRD_USER = process.env.THIRD_USER
export const THIRD_PASS = process.env.THIRD_PASS
export const THIRD_URL = process.env.THIRD_URL