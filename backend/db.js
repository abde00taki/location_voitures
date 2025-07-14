const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'location_voitures',
});

module.exports = db;
