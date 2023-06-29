require('dotenv').config();

const fs = require('fs');
const mysql = require('mysql2/promise');

const migrate = async () => {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true,
  });

  await connection.query(`DROP DATABASE IF EXISTS ${DB_NAME};`);
  await connection.query(`CREATE DATABASE ${DB_NAME};`);
  await connection.query(`USE ${DB_NAME};`);

  const sql = fs.readFileSync('../db/init.sql', 'utf-8');

  await connection.query(sql);

  connection.end();
};

try {
  migrate();
} catch (error) {
  console.error(error);
}