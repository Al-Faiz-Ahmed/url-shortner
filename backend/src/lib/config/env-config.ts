import "dotenv/config"
const { PORT, DATABASE_URL, NODE_ENV, PUBLIC_SITE_URL } = process.env;
 

export const envConfig = {
  ENV: NODE_ENV as "development" | "production",
  PORT: parseInt(PORT ?? "5000", 10),
  DATABASE_URL: DATABASE_URL,
  PUBLIC_SITE_URL: PUBLIC_SITE_URL
};
