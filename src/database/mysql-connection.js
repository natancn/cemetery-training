import mysql2 from 'mysql2/promise'; // ecma script modules
import 'dotenv/config';

const client = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default client;