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

  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount,
    },
    headers: {
      "x-ba-key": "MmE2YTBhNzE4MTBjNDAyOGJiNzUxZjY0ZmM4MzE2M2Q",
    },
  };

  request(options, function (error, response, body) {
    // console.log(response.statusCode);
    var data = JSON.parse(body);
    // var btc = data.last;
    var price = data.price;
    // var currentDate = data.display_timestamp;

    var currentDate = data.time;

    res.write("<h1>Price Conversion from " + crypto + " to " + fiat + "</h1>");

    res.write(
      "<h1>" + amount + " " + crypto + " = " + price + " " + fiat + " </h1>"
    );

    res.write("<h2> The Current Date is " + currentDate + "</h2>");

    // res.write(
    //   "<h1> The current price of " + crypto + "is " + price + fiat + " USD</h1>"
    // );

    res.send();
    // console.log(response.statusCode);
  });

  //   console.log(req.body.crypto);
});

app.listen(3000, function () {
  console.log("Server started running...");
});
