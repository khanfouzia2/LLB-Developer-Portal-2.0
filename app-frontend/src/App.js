import React, { Component } from 'react';
import Example from './components/Example/Example';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            Hello Word from LLB - frontend part
            <Example></Example>
         </header>
      </div>
    );
  }
}

export default App;
