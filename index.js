const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3000;

// Parse application/json
app.use(bodyParser.json());

// Create MySQL Connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'formbuilder'
});

// Connect to MySQL
connection.connect(error => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

// New code for PostGreSQL via GPT
const { Pool } = require('pg');

const pool = new Pool({
  user: 'bgrjemso',
  host: 'ruby.db.elephantsql.com',
  database: 'bgrjemso',
  password: 'fBpq8iYZaAUqz9Q-w-ScrOmSCmbqc8bD',
  port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    console.log('Query result', res.rows);
  }
  pool.end();
});


// Get all forms
app.get('/api/forms', (req, res) => {
  const sql = 'SELECT * FROM forms';

  connection.query(sql, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Get form by ID
app.get('/api/forms/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM forms WHERE id = ${id}`;

  connection.query(sql, (error, result) => {
    if (error) throw error;
    if (result.length === 0) {
      res.status(404).json({ message: `Form with id ${id} not found.` });
    } else {
      res.json(result[0]);
    }
  });
});

// Create a new form
app.post('/api/forms', (req, res) => {
  const { title, description, fields } = req.body;
  const sql = `INSERT INTO forms (title, description, fields) VALUES ('${title}', '${description}', '${JSON.stringify(fields)}')`;

  connection.query(sql, (error, result) => {
    if (error) throw error;
    const newForm = { id: result.insertId, title, description, fields };
    res.status(201).json(newForm);
  });
});

// Update an existing form
app.put('/api/forms/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, fields } = req.body;
  const sql = `UPDATE forms SET title = '${title}', description = '${description}', fields = '${JSON.stringify(fields)}' WHERE id = ${id}`;

  connection.query(sql, (error, result) => {
    if (error) throw error;
    const updatedForm = { id, title, description, fields };
    res.json(updatedForm);
  });
});

// Delete a form
app.delete('/api/forms/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM forms WHERE id = ${id}`;

  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.json({ message: `Form with id ${id} has been deleted.` });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

