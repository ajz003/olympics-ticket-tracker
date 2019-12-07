import React from "react";
import "./HomeSection.css";
import miraitowa from "./../assets/miraitowa.png";
import someity from "./../assets/someity.png";


class HomeSection extends React.Component {
  render() {
    return (
        <div className="App-header">
        <img src={miraitowa} className="App-logo" alt="logo" />
        <img src={someity} className="App-logo spin-reverse" alt="logo" />
        <h1>Welcome to Olymkets</h1>
      </div>
    );
  }
}


export default HomeSection;
