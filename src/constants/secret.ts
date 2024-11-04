import dotenv from 'dotenv'
dotenv.config()
export const DO_SPACES_ENDPOINT = process.env.DO_SPACES_ENDPOINT??""
export const DO_SPACES_KEY = process.env.DO_SPACES_KEY??""
export const DO_SPACES_SECRET = process.env.DO_SPACES_SECRET??""
export const DO_SPACES_REGION = process.env.DO_SPACES_REGION??""
export const DO_SPACES_NAME = process.env.DO_SPACES_NAME??""
