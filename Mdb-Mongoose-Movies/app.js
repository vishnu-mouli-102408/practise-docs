const mongoose = require("mongoose");

// connecting mongoose and mongoDB server
mongoose.connect("mongodb://127.0.0.1:27017/moviesDB");

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

movies.save();