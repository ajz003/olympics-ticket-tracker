const router = require("express").Router();
require('dotenv').config();
const Post = require("../models/post.js");
const axios = require("axios");
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
var cheerio = require("cheerio");
const client = require("twilio")(process.env.accountSid, process.env.authToken);

const Discord = require("discord.js");
const { prefix } = require("./../config.json");
const dcClient = new Discord.Client();

const request = require('request');

axiosCookieJarSupport(axios);

let sports = [
  {
    title: "Badminton",
    url:
      "https://www.cosport.com/olympics/ticketsessiondetail.aspx?sportId=6&excludesoldout=False"
  },
  {
    title: "Shooting",
    url:
      "https://www.cosport.com/olympics/ticketsessiondetail.aspx?sportId=42&excludesoldout=False"
  },
  {
    title: "Sport Climbing",
    url:
      "https://www.cosport.com/olympics/ticketsessiondetail.aspx?sportId=1123&excludesoldout=False"
  },
  {
    title: "Beach Volleyball",
    url:
      "https://www.cosport.com/olympics/ticketsessiondetail.aspx?sportId=8&excludesoldout=False"
  },
  {
    title: "Gymnastics - Artistic",
    url:
      "https://www.cosport.com/olympics/ticketsessiondetail.aspx?sportId=22&excludesoldout=False"
  },
  {
    title: "Gymnastics - Rhythmic",
    url:
      "https://www.cosport.com/olympics/ticketsessiondetail.aspx?sportId=23&excludesoldout=False"
  },
  {
    title: "Gymnastics - Trampoline",
    url:
      "https://www.cosport.com/olympics/ticketsessiondetail.aspx?sportId=24&excludesoldout=False"
  },
  {
    title: "MODERN PENTATHLON",
    url:
      "https://www.cosport.com/olympics/ticketsessiondetail.aspx?sportId=28&excludesoldout=False"
  },
  {
    title: "Tennis",
    url:
      "https://www.cosport.com/olympics/ticketsessiondetail.aspx?sportId=35&excludesoldout=False"
  },
  {
    title: "Closing Ceremony",
    url:
      "https://www.cosport.com/olympics/ticketsessiondetail.aspx?sportId=44&excludesoldout=False"
  }
];

router.get("/api/sports", function (req, res) {
  res.send(sports);
});

let totalMessage = "\n";

router.get("/api/scrape-olympics", function (req, res) {
  let i = 0;

  let allResults = [];
  let allSportsSoldOut = true;

  function scrapeSport(iterator) {

    request(sports[iterator].url, { json: true, jar: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(body);



      var results = {
        results: []
      };

      let sportTitle = $("span.discipline-title span.name").text();
      let sportIsAllSoldOut = true;
      let textMessage = "";

      $(".session-info").each(function (i, element) {
        // Save an empty result object
        var result = {};
        result.sportTitle = sportTitle;
        result.date = $(this)
          .find("span.label")
          .first()
          .text();

        result.sessionCode = $(this)
          .find(".session-code")
          .text()
          .replace("Session Code: ", "");

        result.info = [];

        let list = $(this).find("li.package");

        list.each(function (i, element) {
          var ticketInfo = {};
          ticketInfo.category = $(this)
            .children("span.letter")
            .text();
          ticketInfo.price = $(this)
            .children("span.text")
            .text();

          if (ticketInfo.price !== "Sold Out" && sportIsAllSoldOut === true) {
            sportIsAllSoldOut = false;
            allSportsSoldOut = false;
            textMessage += `${result.sportTitle} has tickets available at ${sports[iterator].url} !\n`;
          }

          result.info.push(ticketInfo);
        });

        console.log(result);

        results.results.push(result);
      });

      if (sportIsAllSoldOut === true) {
        textMessage = `No ${sports[iterator].title} tickets available.\n`;
      }

      totalMessage += textMessage;

      allResults.push(results);

      i++;

      let min = 1000;
      let max = 5000;
      let range = max - min;
      let randInterval = Math.random() * Math.floor(range) + min;

      console.log(randInterval);
      if (i < sports.length) {
        setTimeout(function () {
          scrapeSport(i);
        }, randInterval);
      } else {
        setTimeout(() => {
          if (allSportsSoldOut === false) {
            client.messages
              .create({
                body: totalMessage,
                from: process.env.TWILIO_NUMBER,
                to: process.env.MY_NUMBER
              })
              .then(function (response) { })
              .done();

            dcClient.once("ready", () => {
              const channel = dcClient.channels.get("***REMOVED***");
              try {
                channel.send(totalMessage);
              } catch (error) {
                channel.send(console.error(error));
              }
            });
            dcClient.login(process.env.DC_TOKEN);
          } else if (allSportsSoldOut === true) {
            console.log(totalMessage);
          }

        }, min + max);
      }

    });
  }

  scrapeSport(i);
});

router.get("/api/noon-test", function (req, res) {
  let i = 0;

  let allResults = [];
  let allSportsSoldOut = true;

  function scrapeSport(iterator) {

    request(sports[iterator].url, { json: true, jar: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(body);



      var results = {
        results: []
      };

      let sportTitle = $("span.discipline-title span.name").text();
      let sportIsAllSoldOut = true;
      let textMessage = "";

      $(".session-info").each(function (i, element) {
        // Save an empty result object
        var result = {};
        result.sportTitle = sportTitle;
        result.date = $(this)
          .find("span.label")
          .first()
          .text();

        result.sessionCode = $(this)
          .find(".session-code")
          .text()
          .replace("Session Code: ", "");

        result.info = [];

        let list = $(this).find("li.package");

        list.each(function (i, element) {
          var ticketInfo = {};
          ticketInfo.category = $(this)
            .children("span.letter")
            .text();
          ticketInfo.price = $(this)
            .children("span.text")
            .text();

          if (ticketInfo.price !== "Sold Out" && sportIsAllSoldOut === true) {
            sportIsAllSoldOut = false;
            allSportsSoldOut = false;
            textMessage += `${result.sportTitle} has tickets available at ${sports[iterator].url} !\n`;
          }

          result.info.push(ticketInfo);
        });

        console.log(result);

        results.results.push(result);
      });

      if (sportIsAllSoldOut === true) {
        textMessage = `No ${sports[iterator].title} tickets available.\n`;
      }

      totalMessage += textMessage;

      allResults.push(results);

      i++;

      let min = 1000;
      let max = 5000;
      let range = max - min;
      let randInterval = Math.random() * Math.floor(range) + min;

      console.log(randInterval);
      if (i < sports.length) {
        setTimeout(function () {
          scrapeSport(i);
        }, randInterval);
      } else {
        setTimeout(() => {

            client.messages
              .create({
                body: totalMessage,
                from: process.env.TWILIO_NUMBER,
                to: process.env.MY_NUMBER
              })
              .then(function (response) { })
              .done();

            dcClient.once("ready", () => {
              const channel = dcClient.channels.get("***REMOVED***");
              try {
                channel.send(totalMessage);
              } catch (error) {
                channel.send(console.error(error));
              }
            });
            dcClient.login(process.env.DC_TOKEN);
          

        }, min + max);
      }

    });
  }

  scrapeSport(i);
});

module.exports = router;
