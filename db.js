const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',       // change if needed
  database: 'testdb'  // make sure this DB exists
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

module.exports = connection;
