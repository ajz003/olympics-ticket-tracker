const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;
const app = express();

require('dotenv').config();

var mysql = require('mysql');


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
const routes = require("./routes/api.js");
app.use(routes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Connect to the Mongo DB

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/csredditposts");

var connection = mysql.createConnection(process.env.JAWSDB_URL || {
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'sakila'
});

function handleDuplicate(error) {
    if (error.errno === 1062) {
        console.log("That phone number already exists in our database.")
    }
}

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);

  var sql = `INSERT INTO user (tel_number, subscribed) VALUES ('${process.env.OTHER_NUMBER}', FALSE)`;

  connection.query(sql, function (err, result) {
    if (err) {
        handleDuplicate(err);
    } else {
        console.log("Phone number added!")
    }
  });

  var sqlNext = `INSERT INTO user (tel_number, subscribed) VALUES ('${process.env.OTHER_NUMBER}', FALSE)`;

  connection.query(sqlNext, function (err, result) {
    if (err) {
        handleDuplicate(err);
    } else {
        console.log("Phone number added!")
    }
  });

});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
