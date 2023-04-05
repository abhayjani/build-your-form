const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Parse application/json
app.use(bodyParser.json());

// New code for PostgreSQL via ElephantSQL
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

  pool.query(sql, (error, results) => {
    if (error) throw error;
    res.json(results.rows);
  });
});

// Get form by ID
app.get('/api/forms/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM forms WHERE id = ${id}`;

  pool.query(sql, (error, result) => {
    if (error) throw error;
    if (result.rows.length === 0) {
      res.status(404).json({ message: `Form with id ${id} not found.` });
    } else {
      res.json(result.rows[0]);
    }
  });
});

// Create a new form
app.post('/api/forms', (req, res) => {
  const { title, description, fields } = req.body;
  const sql = `INSERT INTO forms (title, description, fields) VALUES ('${title}', '${description}', '${JSON.stringify(fields)}')`;

  pool.query(sql, (error, result) => {
    if (error) throw error;
    const newForm = { id: result.rows[0].id, title, description, fields };
    res.status(201).json(newForm);
  });
});

// Update an existing form
app.put('/api/forms/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, fields } = req.body;
  const sql = `UPDATE forms SET title = '${title}', description = '${description}', fields = '${JSON.stringify(fields)}' WHERE id = ${id}`;

  pool.query(sql, (error, result) => {
    if (error) throw error;
    const updatedForm = { id, title, description, fields };
    res.json(updatedForm);
  });
});

// Delete a form
app.delete('/api/forms/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM forms WHERE id = ${id}`;

  pool.query(sql, (error, result) => {
    if (error) throw error;
    res.json({ message: `Form with id ${id} has been deleted.` });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
