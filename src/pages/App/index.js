import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  gotoprofile = () => {
    this.props.history.push("/profile");
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.gotoprofile}>Profile</button>
      </div>
    );
  }
}

export default App;
