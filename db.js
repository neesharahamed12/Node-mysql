// db.js
require('dotenv').config();
const mysql = require('mysql2/promise');

async function connectWithRetry() {
  let pool;
  const {
    DB_HOST, DB_USER, DB_PASSWORD,
    DB_NAME, DB_PORT = 3306
  } = process.env;

  while (!pool) {
    try {
      pool = mysql.createPool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        port: DB_PORT,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
      // simple test query
      await pool.query('SELECT 1');
      console.log('✅ Connected to MySQL database');
    } catch (err) {
      console.error('❌ MySQL connection failed – retrying in 5 s…', err.message);
      await new Promise(r => setTimeout(r, 5000));
    }
  }
  return pool;
}

module.exports = connectWithRetry();
