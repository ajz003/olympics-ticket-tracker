import React, { Component } from "react";
import Header from "./components/Header.js";
import HomeSection from "./components/HomeSection.js";
import logo from "./logo.svg";
import miraitowa from "./assets/miraitowa.png";
import someity from "./assets/someity.png";
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

  message += minutePortion + " minutes remaining until noon (PST).";

  return message;
}


class App extends Component {

  render() {
    let message = timeToNextNoon();
    return (
      <div className="App">
        <div className="top-nav">
          <Header />
        </div>
        <div className="App-header">
          <img src={miraitowa} className="App-logo" alt="logo" />
          <img src={someity} className="App-logo spin-reverse" alt="logo" />
          <h1>Welcome to Olymkets</h1>
        </div>
        <HomeSection 
          backgroundColor="grey-back"
          h2="What is Olymkets?"
        />
        <p className="App-intro">
          {message}
        </p>
      </div>
    );
  }
}


export default App;
