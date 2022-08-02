import 'dotenv/config'

export const PORT = process.env.PORT
export const MONGO_URL = process.env.MONGO_URL
export const SALT = Number(process.env.SALT)