// const { MongoClient } = require("mongodb");

// // Replace the uri string with your connection string.
// const uri = "mongodb://127.0.0.1:27017";

// const client = new MongoClient(uri);

// async function run() {
//   try {
//     const database = client.db("moviesDB");
//     const movies = database.collection("movies");

//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: "Back to the Future" };
//     const movie = await movies.findOne(query);

//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// import { MongoClient } from "mongodb";
// const { MongoClient } = require("mongodb");

// // Replace the uri string with your MongoDB deployment's connection string.
// const uri = "mongodb://127.0.0.1:27017";

// const client = new MongoClient(uri);

// async function run() {
//   try {
//     const database = client.db("insertDB");
//     const haiku = database.collection("haiku");
//     // create a document to insert
//     const doc = {
//       title: "Record of a Shriveled Datum",
//       content: "No bytes, no problem. Just insert a document, in MongoDB",
//     };
//     const result = await haiku.insertOne(doc);

//     console.log(`A document was inserted with the _id: ${result.insertedId}`);
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);

// import { MongoClient } from "mongodb";
const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("insertDB");
    const movies = database.collection("haiku");

    // Query for a movie that has the title 'The Room'
    const query = { title: "Record of a Shriveled Datum" };

    const options = {
      // sort matched documents in descending order by rating
      sort: { content: -1 },
      // Include only the `title` and `imdb` fields in the returned document
      projection: { _id: 0, title: 1, content: 1 },
    };

    const movie = await movies.findOne(query, options);

    // since this method returns the matched document, not a cursor, print it directly
    console.log(movie);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
