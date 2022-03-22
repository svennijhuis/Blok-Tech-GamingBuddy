// connection met mongodb die overal gebruikt wordt. returned nu db, in geval van meerdere databases, return client
// enkele connection die wordt hergebruikt zorgt ervoor dat connection niet kan crashen wanneer te snel database acties worden uitgevoerd
const dotenv = require("dotenv");
dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.acfzh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const { MongoClient } = require("mongodb");

// let db;
let client;

const getDB = async () => {
  // test of database verbonden is, zo ja return db. Zo nee, maak + return db
  if (client) {
    return client;
  }
  try {
    client = await MongoClient.connect(uri);
  } catch (err) {
    console.log(err);
  }
  return client;
};

module.exports = { getDB };
