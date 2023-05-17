const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// app.get("/", function (req, res) {
//   var today = new Date();
//   currentDay = today.getDay();
//   day = "";
//   weekday = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];

//   if (currentDay === 6 || currentDay === 0) {
//     day = weekday[currentDay];
//     // res.send("<h1>It's Saturday or Sunday, baby!</h1>");
//   } else {
//     day = weekday[currentDay];
//     // res.send("<h1>It's Working day, baby!</h1>");
//   }
//   res.render("lists", { kindOfDay: day });
// });

let foods = ["Buy Food", "Cook Food", "Eat Food"];

app.get("/", function (req, res) {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("lists", { kindOfDay: day, newListItems: foods });
});

app.post("/", function (req, res) {
  let food = req.body.newItem;
  foods.push(food);
  //   console.log(food);
  //   console.log(req.body);
  //   console.log(req);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started running...");
});
