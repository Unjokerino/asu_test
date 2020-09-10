import React, { useState } from 'react';
import logo from './logo.svg';
import Routes from './router'
import Header from './components/header'
import './App.css';

import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

const App = () => {
  const [state, setstate] = useState(false)
  return (
    <Router>
      <Header />
      <Routes />
    </Router>

  );
}

export default App;
