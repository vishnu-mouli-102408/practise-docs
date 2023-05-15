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

  var baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  console.log(baseUrl);
  var finalUrl = baseUrl + crypto + fiat;

  request(finalUrl, function (error, response, body) {
    console.log(response.statusCode);
    var data = JSON.parse(body);
    var btc = data.last;

    res.send(
      "<h1> The current price of " + crypto + "is " + price + fiat + " USD</h1>"
    );
  });

  //   console.log(req.body.crypto);
});

app.listen(3000, function () {
  console.log("Server started running...");
});
