/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        API_KEY: process.env.API_KEY,
        AUTH_DOMAIN: process.env.AUTH_DOMAIN,
        PROJECT_ID: process.env.PROJECT_ID,
        STORAGE_BUCKET: process.env.STORAGE_BUCKET,
        MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
        APP_ID: process.env.APP_ID,
        MEASUREMENT_ID: process.env.MEASUREMENT_ID,
        SERVER_URL: process.env.SERVER_URL,
        ADMIN_ID: process.env.ADMIN_ID,
    },
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
}

export default nextConfig
