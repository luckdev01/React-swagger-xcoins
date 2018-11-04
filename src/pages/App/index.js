import React, { Component } from 'react';
import Banner from './banner';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  gotoprofile = () => {
    this.props.history.push("/profile");
  }
  gotoproducts = () => {
    this.props.history.push("/products");
  }
  gotousers = () => {
    this.props.history.push("/users");
  }
  
  render() {
    return (
      <div className="App">

        <Banner />
        
        <button onClick={this.gotoprofile}>Profile</button>
        <button onClick={this.gotoproducts}>Products</button>
        <button onClick={this.gotousers}>Users</button>
      </div>
    ); 
  }
}

export default App;
