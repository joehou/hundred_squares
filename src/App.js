import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Blocks from './components/Blocks'

class App extends Component {

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Click and drag mouse or use shift key to select cells.
        </p>
        <Blocks />
      </div>
    );
  }
}

export default App;
