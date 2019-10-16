import React from "react";
import olympicsLogo from "../assets/olympicsLogo.svg";
import "./Header.css";


class Header extends React.Component {
  render() {
    return (
      <div>
        <div className="matter-container">
          <div className="left-matter">
            <img
              src={olympicsLogo}
              className="nav-logo"
              alt="Tokyo 2020 Olympics Logo"
            />
            <span className="nav-title">Olymkets</span>
          </div>
          <div className="right-matter">
            <span className="by-line">A website by Anthony</span>
          </div>
        </div>

      </div>
    );
  }
}


export default Header;
