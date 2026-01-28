import "dotenv/config"
const { PORT, DATABASE_URL, ENV } = process.env;
 

export const config = {
  ENV: ENV as "development" | "production",
  PORT: parseInt(PORT ?? "5000", 10),
  DATABASE_URL: DATABASE_URL,
};
