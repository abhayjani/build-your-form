const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'public')));

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://build-your-form.firebaseio.com'
});

// Initialize Firestore database
const db = admin.firestore();

// Parse application/json
app.use(bodyParser.json());

// Get all forms
app.get('/api/forms', async (req, res) => {
  const forms = [];
  const querySnapshot = await db.collection('forms').get();
  querySnapshot.forEach((doc) => {
    forms.push({ id: doc.id, ...doc.data() });
  });
  res.json(forms);
});

// Get form by ID
app.get('/api/forms/:id', async (req, res) => {
  const { id } = req.params;
  const formRef = db.collection('forms').doc(id);
  const formDoc = await formRef.get();
  if (!formDoc.exists) {
    res.status(404).json({ message: `Form with id ${id} not found.` });
  } else {
    res.json({ id: formDoc.id, ...formDoc.data() });
  }
});

// Create a new form
app.post('/api/forms', async (req, res) => {
  const { title, description, fields } = req.body;
  const formRef = await db.collection('forms').add({ title, description, fields });
  const newForm = { id: formRef.id, title, description, fields };
  res.status(201).json(newForm);
});

// Update an existing form
app.put('/api/forms/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, fields } = req.body;
  const formRef = db.collection('forms').doc(id);
  await formRef.update({ title, description, fields });
  const updatedForm = { id, title, description, fields };
  res.json(updatedForm);
});

// Delete a form
app.delete('/api/forms/:id', async (req, res) => {
  const { id } = req.params;
  const formRef = db.collection('forms').doc(id);
  await formRef.delete();
  res.json({ message: `Form with id ${id} has been deleted.` });
});

// Serve the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred while serving the home page');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
