import React, { Component } from 'react';
import Kanban from './components/kanban';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Kanban />
      </div>
    );
  }
}

export default App;
