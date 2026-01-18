const { PORT, DATABASE_URL } = process.env;

export const config = {
  PORT: parseInt(PORT ?? "5000", 10),
  DATABASE_URL: DATABASE_URL,
};
