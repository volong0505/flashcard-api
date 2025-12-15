import { ENV_CORS_ORIGINS, ENV_MONGODB_URI, ENV_PORT } from "./_shared";

export const appConfig = {
    port: process.env[ENV_PORT] || 3331,
    corsOrigins: process.env[ENV_CORS_ORIGINS] || 'http://localhost:4200',
    mongodbUri: process.env[ENV_MONGODB_URI] || 'mongodb+srv://volongworkspace_db_user:ecosystempw@ecosystem.hdaumhb.mongodb.net/?appName=Ecosystem',
}