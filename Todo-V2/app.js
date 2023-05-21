const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todoListDB");

const todoListSchema = {
  name: String,
};

const TodoList = mongoose.model("item", todoListSchema);

const item1 = new TodoList({
  name: "Learn Node.js",
});

const item2 = new TodoList({
  name: "Learn Express.js",
});

const item3 = new TodoList({
  name: "Learn MongoDB",
});

const defaultItems = [item1, item2, item3];

// TodoList.deleteOne({
//   _id: "6469b555278f84e9149961c4",
// })
//   .then(function (x) {
//     console.log(x);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

app.get("/", function (req, res) {
  const day = date.getDate();

  TodoList.find({})
    .then(function (foundItems) {
      if (foundItems === 0) {
        TodoList.insertMany(defaultItems)
          .then(function () {
            console.log("Successfully Inserted");
          })
          .catch(function (err) {
            console.log("Error Occurred");
          });
        res.redirect("/");
      } else {
        res.render("list", { listTitle: day, newListItems: foundItems });
      }
    })
    .catch(function (err) {
      console.log("Error! Please try again");
    });
});

app.post("/", function (req, res) {
  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
