const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  var today = new Date();
  if (today.getDay() === 6 || today.getDay() === 0) {
    res.send("<h1>It's Saturday or Sunday, baby!</h1>");
  } else {
    res.send("<h1>It's Working day, baby!</h1>");
  }
});

app.listen(3000, function () {
  console.log("Server started running...");
});
