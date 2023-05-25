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

/////////////////// Request Targetting All Articles ///////////////////

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

/////////////////// Request Targetting A Specfic  Article ///////////////////

app
  .route("/articles/:articleTitle")

  .get(function (req, res) {
    Article.findOne({ title: req.params.articleTitle })
      .then(function (foundArticle) {
        res.send(foundArticle);
      })
      .catch(function (err) {
        res.send(err);
      });
  })

  .put(function (req, res) {
    Article.update(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content },
      { overwrite: true }
    )
      .then(function () {
        res.send("Article Updated");
      })
      .catch(function (err) {
        res.send(err);
      });
  })

  .patch(function (req, res) {
    Article.update({ title: req.params.articleTitle }, { $set: req.body })
      .then(function () {
        res.send("Article Updated Successfully");
      })
      .catch(function (err) {
        res.send(err);
      });
  });

app.listen(3000, function () {
  console.log("Server Started running on port 3000");
});
