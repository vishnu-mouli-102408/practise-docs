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

  // console.log(firstName, lastName, emailAddress);

  var options = {
    url: "https://us21.api.mailchimp.com/3.0/lists/86dd96256d",
    method: "POST",
    headers: {
      Authorization: "Mouli 6854ae848bd9650301cbbb0b39e4dce0-us21",
    },
    body: jsonData,
  };

  request(options, function (error, response, body) {
    if (error) {
      console.log(error);
    } else {
      console.log(response.statusCode);
    }
  });
});

app.listen(3000, function () {
  console.log("server started running...");
});

// 6854ae848bd9650301cbbb0b39e4dce0-us21

// 86dd96256d
