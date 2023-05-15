const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;

  // var baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  // console.log(baseUrl);
  // var finalUrl = baseUrl + crypto + fiat;

  var baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  var finalUrl = baseUrl + crypto + fiat;

  request(options, function (error, response, body) {
    // console.log(response.statusCode);
    var data = JSON.parse(body);
    // var btc = data.last;
    var price = data.price;
    // var currentDate = data.display_timestamp;

    var currentDate = data.time;

    res.write("<p>the current date is " + currentDate + "</p>");
    // res.write(
    //   "<h1> The current price of " + crypto + "is " + price + fiat + " USD</h1>"
    // );

    res.write("<h1>" + amount + crypto + "is " + price + fiat + "</h1>");

    res.send();
  });

  //   console.log(req.body.crypto);
});

app.listen(3000, function () {
  console.log("Server started running...");
});
