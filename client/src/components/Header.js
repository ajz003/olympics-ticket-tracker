import React from "react";
import olympicsLogo from "../assets/olympicsLogo.svg";
import hamburgerIcon from "../assets/Hamburger_icon.svg";
import "./Header.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { AlertContext } from "twilio/lib/rest/monitor/v1/alert";

class SideMenu extends React.Component {

  render() {
    let className = 'menu-toggle';
    let mobileMenu = "mobile-menu";
    if (!this.props.isMenuOpen) {
      className += ' open';

    } if (this.props.isMenuOpen) {

      mobileMenu += ' open';
    }


    return (
      <div className="mobile-menu-container">
        <img src={hamburgerIcon} onClick={this.props.handleClick} class={className} />

        <div className={mobileMenu}>
<ul className="mobile-menu-ul">          
          <li onClick={this.props.handleClick} >
            X
          </li>

            <li><a href="/about">About</a></li>
            <li><a href="/login">Log-in</a></li>
</ul>
        </div>
      </div>
    )
  }
}

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isMenuOpen: false };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isMenuOpen: !state.isMenuOpen
    }));
  }

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
          <div className="center-matter">

            <a href="/about">About</a>

            <a href="/users">Users</a>

          </div>
          <div className="right-matter">
            <span className="by-line">A website by Anthony</span>
          </div>
          <SideMenu
            isMenuOpen={this.state.isMenuOpen}
            handleClick={this.handleClick}
          />
        </div>
      </div>
    );
  }
}



export default Header;
