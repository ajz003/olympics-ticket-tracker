import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

function minsToNoon(){
  var d = new Date();
  return (-d + d.setHours(24,0,0,0))/6e4;
}

console.log(minsToNoon());

class App extends Component {

  render() {
    let timeLeft = minsToNoon();
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Olymkets</h2>
        </div>
        <p className="App-intro">
          There are {timeLeft} minutes until noon, when the next text will be sent.
        </p>
      </div>
    );
  }
}

export default App;
