// const express = require('express');
// const bodyParser = require('body-parser');
// const db = require('./db');

// const app = express();
// const PORT = 3000;

// app.set('view engine', 'ejs');
// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: false }));

// // Home page - List students
// app.get('/', (req, res) => {
//   db.query('SELECT * FROM students', (err, results) => {
//     if (err) throw err;
//     res.render('index', { students: results });
//   });
// });

// // Add student form
// app.get('/add', (req, res) => {
//   res.render('add');
// });

// // Handle form submit
// app.post('/add', (req, res) => {
//   const { name, email } = req.body;
//   db.query('INSERT INTO students (name, email) VALUES (?, ?)', [name, email], (err) => {
//     if (err) throw err;
//     res.redirect('/');
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Home page - List all employees
app.get('/', (req, res) => {
  db.query('SELECT * FROM employees ORDER BY id DESC', (err, results) => {
    if (err) throw err;
    res.render('index', { employees: results });
  });
});

// Add employee form
app.get('/add', (req, res) => {
  res.render('add');
});

// Handle add form submit
app.post('/add', (req, res) => {
  const { name, email, department, designation, phone, join_date } = req.body;

  const sql = `
    INSERT INTO employees (name, email, department, designation, phone, join_date)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [name, email, department, designation, phone, join_date];

  db.query(sql, values, (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
