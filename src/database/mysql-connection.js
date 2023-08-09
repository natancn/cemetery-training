import mysql from 'mysql2/promise'; // ecma script modules
import 'dotenv/config';

const client = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  waitForConnections: true,
});

export default client;