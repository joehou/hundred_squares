import React, { Component } from 'react';
//import logo from './logo.svg';

import Blocks from './components/Blocks'

class App extends Component {

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hundred Blocks a Day</h1>
        </header>
        <p className="App-intro">
          Blockity block blockity block block block
        </p>
        <Blocks />
      </div>
    );
  }
}

export default App;
