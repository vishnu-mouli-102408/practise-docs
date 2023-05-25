const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

const articleSchema = {
  title: String,
  content: String,
};

Article = mongoose.model("Article", articleSchema);

// app.get("/articles", function (req, res) {
//   Article.find()
//     .then(function (foundItems) {
//       res.send(foundItems);
//     })
//     .catch(function (err) {
//       res.send(err);
//     });
// });

// app.post("/articles", function (req, res) {
//   console.log(req.body.title);
//   console.log(req.body.content);

//   const newArticle = new Article({
//     title: req.body.title,
//     content: req.body.content,
//   });

//   newArticle
//     .save()
//     .then(function () {
//       console.log("Successfully Added new Article");
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// });

// app.delete("/articles", function (req, res) {
//   Article.deleteMany()
//     .then(function () {
//       res.send("Articles Deleted");
//     })
//     .catch(function (err) {
//       res.send(err);
//     });
// });

// Chain Routing

app
  .route("/articles")

  .get(function (req, res) {
    Article.find()
      .then(function (foundItems) {
        res.send(foundItems);
      })
      .catch(function (err) {
        res.send(err);
      });
  })

  .post(function (req, res) {
    console.log(req.body.title);
    console.log(req.body.content);

    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle
      .save()
      .then(function () {
        console.log("Successfully Added new Article");
      })
      .catch(function (err) {
        console.log(err);
      });
  })

  .delete(function (req, res) {
    Article.deleteMany()
      .then(function () {
        res.send("Articles Deleted");
      })
      .catch(function (err) {
        res.send(err);
      });
  });

app.listen(3000, function () {
  console.log("Server Started running on port 3000");
});
