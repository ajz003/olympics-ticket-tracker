import React, { Component } from "react";
import Header from "./Header.js";
import Hero from "./Hero.js";
import HomeSection from "./HomeSection.js";
import Login from "./Login.js";
import logo from "./../logo.svg";

import "./Home.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function timeToNextNoon() {
  var d = new Date();
  let minutesLeft = (-d + d.setHours(12, 0, 0, 0)) / 6e4;
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


class Home extends Component {

  render() {
    let message = timeToNextNoon();
    return (
        <div className="App">
            <Hero />
            <HomeSection
              backgroundColor="grey-back"
              h2="What is Olymkets?"
            />
            <Login />
            <p className="App-intro">
              {message}
            </p>
        </div>
    );
  }
}


export default Home;
