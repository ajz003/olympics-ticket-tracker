import React, { Component } from "react";
import Home from "./components/Home.js";
import Header from "./components/Header.js";
import logo from "./logo.svg";
import 'bootstrap/dist/css/bootstrap.min.css';


import "./App.css";

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


class App extends Component {

  render() {
    let message = timeToNextNoon();
    return (
      <Router>
      <Header />
          <Route exact path="/">

            <Home />
          </Route>

          <Route path="/about">
          <h2>ABOUT</h2>
          <p className="App-intro">
              {message}
            </p>
          </Route>

      </Router>
    );
  }
}


export default App;
