import React from "react";
import olympicsLogo from "../assets/olympicsLogo.svg";
import "./Header.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <div className="top-nav">
        <div className="matter-container">
          <div className="left-matter">
            <a href="/">
              <img
                src={olympicsLogo}
                className="nav-logo"
                alt="Tokyo 2020 Olympics Logo"
              />
            </a>
            <a href="/" className="nav-title">
              <span>Olymkets</span>
            </a>
          </div>
          <div className="right-matter">
            <span>
              <a href="/about">About</a>
            </span>
            <span>
              <a href="/users">Users</a>
            </span>
            <span className="by-line">A website by Anthony</span>
          </div>
        </div>
      </div>
    );
  }
}



export default Header;
