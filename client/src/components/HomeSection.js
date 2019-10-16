import React from "react";
import "./HomeSection.css";


class HomeSection extends React.Component {
  render() {
    return (
      <div className={`home-section ${this.props.backgroundColor}`}>
          <h2>{this.props.h2}</h2>
          <p>Olymkets stands for "Olympic Tickets". It was originally made to track the website of <a href="https://www.cosport.com/">CoSport</a><sup>®</sup>, which is the only Authorised Ticket Resellers (ATR) of Olympic event tickets for the US.</p>
          <p>It's really just a crappy app that I made and that my friends and I are using to plan our Japan trip in 2020 to see the Tokyo Olympics.</p>
      </div>
    );
  }
}


export default HomeSection;
