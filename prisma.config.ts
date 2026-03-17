import { defineConfig } from 'prisma/config'
import { config } from 'dotenv'

config({
  path: `.env.${process.env.NODE_ENV ?? 'dev'}`
})

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
})