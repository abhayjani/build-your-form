// Import components
import Form from './components/Form/Form.js';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';

// Import Firebase utility
import { initializeFirebase } from './utils/firebase.js';

// Initialize Firebase
initializeFirebase();

// Render components
document.getElementById('header').appendChild(Header());
document.getElementById('form').appendChild(Form());
document.getElementById('footer').appendChild(Footer());

// Form submission
const form = document.getElementById('create-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/api/create-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);

    // Reset the form
    form.reset();

    // Display a success message
    const alert = document.createElement('div');
    alert.className = 'alert alert-success mt-3';
    alert.textContent = 'Form submitted successfully!';
    form.parentElement.insertBefore(alert, form);

    setTimeout(() => {
      alert.remove();
    }, 3000);
  } catch (error) {
    console.error('Error:', error);

    // Display an error message
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger mt-3';
    alert.textContent = 'Error: Form submission failed. Please try again.';
    form.parentElement.insertBefore(alert, form);

    setTimeout(() => {
      alert.remove();
    }, 3000);
  }
});
