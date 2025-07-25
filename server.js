// app.js (excerpt)
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');        // exports a Promise that resolves to the pool

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Home page – list all employees
app.get('/', async (req, res) => {
  try {
    const pool = await db;
    const [employees] = await pool.query('SELECT * FROM employees ORDER BY id DESC');
    res.render('index', { employees });
  } catch (err) {
    console.error('DB Error:', err.message);
    res.status(500).send('Database error');
  }
});


// Add employee form
app.get('/add', (req, res) => {
  res.render('add');
});

// Handle add form submit
app.post('/add', async (req, res) => {
  const { name, email, department, designation, phone, join_date } = req.body;

  const sql = `
    INSERT INTO employees (name, email, department, designation, phone, join_date)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [name, email, department, designation, phone, join_date];

  try {
    const pool = await db;
    await pool.query(sql, values);
    res.redirect('/');
  } catch (err) {
    console.error('Insert Error:', err.message);
    res.status(500).send('Database error');
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
