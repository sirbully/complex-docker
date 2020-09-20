import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Fib from './Fib';
import OtherPage from './OtherPage';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Fibonacci Calculator</h1>
          <Link to="/">Home</Link>
          <Link to="/other">Other Page</Link>
        </header>
        <div>
          <Route exact path="/" component={Fib} />
          <Route exact path="/other" component={OtherPage} />
        </div>
      </div>
    </Router>
  );
};

export default App;
