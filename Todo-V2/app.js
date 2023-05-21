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
  // name: {
  //   type: String,
  //   required: [true, "Name Required"],
  // },
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

const listItemsSchema = {
  name: String,
  items: [todoListSchema],
};

const List = mongoose.model("List", listItemsSchema);

// TodoList.deleteOne({
//   _id: "6469b555278f84e9149961c4",
// })
//   .then(function (x) {
//     console.log(x);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });
const day = date.getDate();
app.get("/", function (req, res) {
  TodoList.find({})
    .then(function (foundItems) {
      // console.log(foundItems);
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

app.get("/:customListName", function (req, res) {
  const customListName = req.params.customListName;

  List.findOne({ name: customListName })
    .then(function (foundList) {
      if (!foundList) {
        // Create new List
        // console.log("Not Exist");
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        // Show Existing List
        // console.log("Exist");
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items,
        });
      }
    })
    .catch(function (err) {
      console.log("Error! Please try again");
    });
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new TodoList({
    name: itemName,
  });

  if (listName === day) {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }).then(function (foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }

  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {

  // }
});

app.post("/delete", function (req, res) {
  const checkedId = req.body.checkbox;
  TodoList.findByIdAndRemove(checkedId)
    .then(function () {
      // console.log("Successfully Deleted");
      res.redirect("/");
    })
    .catch(function (err) {
      console.log("Error! Please try again");
    });
});

// app.get("/work", function (req, res) {
//   const day = date.getDate();
//   res.render("list", { listTitle: "Work List", newListItems: workItems });
// });

// app.get("/about", function (req, res) {
//   res.render("about");
// });

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
