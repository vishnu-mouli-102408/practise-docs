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
//   res.render("lists", { listTitle: day });
// });

let foods = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.get("/", function (req, res) {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("lists", { listTitle: day, newListItems: foods });
});

app.post("/", function (req, res) {
  let food = req.body.newItem;

  if (req.body.list === "Work List") {
    workItems.push(food);
    res.redirect("/work");
  } else {
    foods.push(food);
    res.redirect("/");
  }

  //   console.log(food);
  // console.log(req.body);
  //   console.log(req);
});

app.get("/work", function (req, res) {
  res.render("lists", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", function (req, res) {
  let food = req.body.newItem;
  workItems.push(food);
  res.redirect("/work");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started running...");
});
