const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;
const app = express();

require('dotenv').config();

var mysql = require('mysql');


// Define middleware here
app.use(bodyParser.urlencoded({ extended: false })); //For body parser
app.use(bodyParser.json());
app.use(express.static("public"));
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

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);

});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
