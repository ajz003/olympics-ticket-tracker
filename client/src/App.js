import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

function timeToNextNoon(){
  var d = new Date();
  let minutesLeft = (-d + d.setHours(12,0,0,0))/6e4;
  if (minutesLeft < 0) {
    minutesLeft += 1440;
  }
  let hoursLeft = Math.floor(minutesLeft / 60);
  let hoursDecimal = (minutesLeft / 60) - hoursLeft;
  let minutePortion = Math.floor(hoursDecimal * 60);

  let message = "";

  if (hoursLeft !== 0) {
    message += hoursLeft + " hours and ";
  }

  message += minutePortion + " minutes remaining until the next text.";

  return message;
}

class App extends Component {

  render() {
    let message = timeToNextNoon();
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Olymkets</h2>
        </div>
        <p className="App-intro">
          {message}
        </p>
      </div>
    );
  }
}

export default App;
