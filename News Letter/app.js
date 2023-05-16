const express = require("express");
const request = require("request");

require("dotenv").config();

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

  var data = {
    members: [
      {
        email_address: emailAddress,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  var jsonData = JSON.stringify(data);

  // console.log(process.env.MY_API_TOKEN);

  // console.log(firstName, lastName, emailAddress);

  var obj = "Mouli ";

  var options = {
    url: "https://us21.api.mailchimp.com/3.0/lists/86dd96256d",
    method: "POST",
    headers: {
      Authorization: obj + process.env.MY_API_TOKEN,
    },
    body: jsonData,
  };

  request(options, function (error, response, body) {
    if (error) {
      // res.send("Oops! Something has gone wrong. Please try again.");
      res.sendFile(__dirname + "/failure.html");
      // console.log(error);
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
        // res.send("Successfully Subscribed.");
      } else {
        // res.send("Oops! Something has gone wrong. Please try again.");
        res.sendFile(__dirname + "/failure.html");
      }
      // console.log(response.statusCode);
      // console.log(response);
    }
  });
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("server started running...");
});

// 86dd96256d
