const router = require("express").Router();
const Post = require("../models/post.js");
const axios = require("axios");
var cheerio = require("cheerio");
const client = require('twilio')(process.env.accountSid, process.env.authToken);

// router.get("/api/scrape", function (req, res) {
//     let numDocs = 0;
//     Post.find({}).then((docs) => {
//         numDocs = docs.length
//         axios.get("https://www.reddit.com/r/cscareerquestions/search.json?q=bootcamp&limit=10&sort=new&restrict_sr=1").then(function (response) {
//             for (let i = 0; i < response.data.data.children.length; i++) {
//                 let newPost = {}
//                 newPost.title = response.data.data.children[i].data.title;
//                 newPost.link = response.data.data.children[i].data.url;
//                 Post.create({
//                     title: newPost.title,
//                     link: newPost.link
//                 }, function (err, result) {
//                     if (err) {
//                         console.log(err)
//                     }
//                     if (i === response.data.data.children.length - 1) {
//                         if (numDocs > 0) {
//                             Post.find({}).then((documents) => {
//                                 if (documents.length !== numDocs) {
//                                     let numNew = parseInt(documents.length - numDocs)
//                                     console.log(numNew)
//                                     let textMessage = "Good afternoon!";
//                                     for (let i = documents.length - numNew + 1, j = 1; i < documents.length + 1 && j < 4; i++ , j++) {
//                                         textMessage += "\n\n" + parseInt(j) + ". Title: " + documents[i].title + "\nLink: " + documents[i].link
//                                     }
//                                     if (numNew > 3) {
//                                         textMessage += "\n\n" + "...and " + (numNew - 3) + " more."
//                                     }
//                                     client.messages.create({
//                                         body: textMessage,
//                                         from: '***REMOVED***',
//                                         to: '***REMOVED***'
//                                     }).then(function (response) { }).done();
//                                     console.log(textMessage)
//                                 } else {
//                                     client.messages.create({
//                                         body: "No new posts.",
//                                         from: '***REMOVED***',
//                                         to: '***REMOVED***'
//                                     }).then(function (response) { }).done();
//                                 }
//                             });
//                         }

//                     }
//                 })
//             }
//         }).catch(function (error) {
//             // handle error
//             console.log(error);
//         }).then(function () { });
//     }).then(function () { });
// })

// router.get("/api/posts", function (req, res) {

//     Post.find({})
//         .then((docs) => {
//             res.json(docs);
//         });

// });

let sports = [
    {
        title: "Archery",
        url: "https://www.cosport.com/olympics/ticketsessiondetail.aspx?sportId=2&excludesoldout=False"
    },
    {
        title: "Beach Volleyball",
        url: "https://www.cosport.com/olympics/ticketsessiondetail.aspx?sportId=8&excludesoldout=False"
    },
    {
        title: "Shooting",
        url: "https://www.cosport.com/olympics/ticketsessiondetail.aspx?sportId=42&excludesoldout=False"
    },
    {
        title: "Gymnastics - Artistic",
        url: "https://www.cosport.com/olympics/ticketsessiondetail.aspx?sportId=22&excludesoldout=False"
    },
    {
        title: "Gymnastics - Rhythmic",
        url: "https://www.cosport.com/olympics/ticketsessiondetail.aspx?sportId=23&excludesoldout=False"
    },
    {
        title: "Gymnastics - Trampoline",
        url: "https://www.cosport.com/olympics/ticketsessiondetail.aspx?sportId=24&excludesoldout=False"
    },
    {
        title: "Tennis",
        url: "https://www.cosport.com/olympics/ticketsessiondetail.aspx?sportId=35&excludesoldout=False"
    },
]

let totalMessage = "";

// A GET route for scraping the echoJS website
router.get("/api/scrape-olympics", function (req, res) {
    let i = 0;

    let allResults = [];

    function scrapeSport(iterator) {
        // First, we grab the body of the html with axios

        axios.get(sports[iterator].url).then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            var results = {
                "results": []
            };

            let sportTitle = $("span.discipline-title span.name").text();
            let isAllSoldOut = true;
            let textMessage = "";

            // Now, we grab every h2 within an article tag, and do the following:
            $(".session-info").each(function (i, element) {
                // Save an empty result object
                var result = {};
                result.sportTitle = sportTitle;
                result.date = $(this)
                    .find("span.label")
                    .first()
                    .text();

                result.sessionCode = $(this).find(".session-code").text().replace("Session Code: ", "");

                result.info = []

                let list = $(this).find("li.package");

                list.each(function (i, element) {
                    var ticketInfo = {};
                    ticketInfo.category = $(this)
                        .children("span.letter")
                        .text();
                    ticketInfo.price = $(this)
                        .children("span.text")
                        .text();

                    if (ticketInfo.price !== "Sold Out" && isAllSoldOut === true) {
                    isAllSoldOut = false;
                    textMessage += `${result.sportTitle} has tickets available at ${sports[iterator].url}!\n`                        
                    }

                    result.info.push(ticketInfo);
                })




                console.log(result);

                results.results.push(result);


            });

            if (isAllSoldOut === true) {
                textMessage = `No ${sports[iterator].title} tickets available.\n`
            }

            totalMessage += textMessage;



            allResults.push(results);


        });
        i++;
        let randInterval = (Math.random() * Math.floor(10000)) + 5000;
        console.log(randInterval);
        if (i < sports.length) {
            setTimeout(function () {
                scrapeSport(i)
            }, randInterval);

        } else {
            // If we were able to successfully scrape and save an Article, send a message to the client
            client.messages.create({
                body: totalMessage,
                from: '***REMOVED***',
                to: '***REMOVED***'
            }).then(function (response) { }).done();            
            res.send(allResults);
        }
    }

    scrapeSport(i);



});



module.exports = router;