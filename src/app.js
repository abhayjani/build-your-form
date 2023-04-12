import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CreateFormPage from './pages/CreateFormPage/CreateFormPage';
// Import other pages when they are created

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/create-form" component={CreateFormPage} />
          {/* Add other routes when pages are created */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
