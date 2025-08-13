import {defineConfig} from 'drizzle-kit'

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL env is required')
}

export default defineConfig({
    dialect: 'postgresql',
    casing: "snake_case",
    out: './drizzle',
    schema: './src/db/schema/**.ts',
    dbCredentials: {
        url: process.env.DATABASE_URL
    },
})