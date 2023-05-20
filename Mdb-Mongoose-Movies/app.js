const mongoose = require("mongoose");

// connecting mongoose and mongoDB server
mongoose.connect("mongodb://127.0.0.1:27017/moviesDB", {
  useNewUrlParser: true,
});

// Step-1 Creating the new Schema
const movieSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String,
});

// Step-2 Creating the model using the new Schema and giving the collection name
const Movies = mongoose.model("movie", movieSchema);

// Step-3 Inserting the data into created collection
const movies = new Movies({
  name: "Fast X",
  rating: 5,
  review: "It's a great comeback movie",
});

// movies.save();

// creating another Schema - Movie Directors

const directorSchema = new mongoose.Schema({
  name: String,
  movie: String,
  age: Number,
});

// Creating model using Schema

const Director = mongoose.model("director", directorSchema);


// Inserting single the data into the model

// director = new Director({
//   name: "Mouli",
//   movie: "Fast X",
//   age: 22,
// });

// director.save();

// Inserting Multiple data into the model

const director1 = new Director({
  name: "Rahul",
  movie: "John Wick",
  age: 33,
});

const director2 = new Director({
  name: "Mouli",
  movie: "Fast X",
  age: 22,
});

const defaultItem = [director1, director2];

Director.insertMany(defaultItem)
  .then(function () {
    console.log("Successfully saved default items to DB");
  })
  .catch(function (err) {
    console.log(err);
  });

// Inserting the data into the model

// const director = new Director({
//   name: "Christopher Nolan",
//   movie: "Oppenheimer",
//   age: 67,
// });

// director.save();

