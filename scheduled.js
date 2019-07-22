const axios = require("axios");

axios.get("https://olymkets.herokuapp.com/api/scrape-olympics").then(function(response) {
}).catch(function(error) {
    // handle error
    console.log(error);
})