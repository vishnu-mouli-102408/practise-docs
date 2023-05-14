const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/calculator.html");
});

app.post("/", function (req, res) {
  const x = Number(req.body.n1);
  console.log(req.body);
  const y = Number(req.body.n2);

  const result = x + y;

  res.send("The result is: " + result);
});

app.get("/bmicalculator", function (req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function (req, res) {
  const x = parseFloat(req.body.num1);
  const y = parseFloat(req.body.num2);

  const result = x / (y * y);

  res.send("Your BMI is: " + result);
});

app.listen(3000, function () {
  console.log("Server Started Running...");
});
