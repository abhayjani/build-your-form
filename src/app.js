import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CreateFormPage from './pages/CreateFormPage/CreateFormPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/create-form" component={CreateFormPage} />
      </Switch>
    </Router>
  );
}

export default App;
