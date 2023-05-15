const express = require("express");
const request = require("request");

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var emailAddress = req.body.emailAddress;

  console.log(firstName, lastName, emailAddress);
});

app.listen(3000, function () {
  console.log("server started running...");
});
