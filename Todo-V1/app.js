const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  var today = new Date();
  currentDay = today.getDay();
  day = "";
  weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (currentDay === 6 || currentDay === 0) {
    day = weekday[currentDay];
    // res.send("<h1>It's Saturday or Sunday, baby!</h1>");
  } else {
    day = weekday[currentDay];
    // res.send("<h1>It's Working day, baby!</h1>");
  }
  res.render("lists", { kindOfDay: day });
});

app.listen(3000, function () {
  console.log("Server started running...");
});
