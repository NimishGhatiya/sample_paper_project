const { Pool } = require("pg");
require("dotenv").config();

const isProd = !!process.env.DATABASE_URL;
const pool = new Pool(
  isProd
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        host: process.env.DEV_DB_HOST,
        user: process.env.DEV_DB_USER,
        password: process.env.DEV_DB_PASSWORD,
        database: process.env.DEV_DB_NAME,
        port: process.env.DEV_DB_PORT,
      }
);

pool.on("connect", () => {
  console.log(`✅ DB connected (${isProd ? "PROD" : "DEV"})`);
});
module.exports = pool;

