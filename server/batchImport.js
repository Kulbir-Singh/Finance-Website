const { MongoClient } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const fs = require("file-system");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const exerciseslist = JSON.parse(fs.readFileSync("exercisesList.json"));
console.log("Here is", exerciseslist);
const client = MongoClient(MONGO_URI, options);

const batchImport = async () => {
  try {
    await client.connect();

    const db = client.db("judo-exercises");
    const result = await db
      .collection("exercisesList")
      .insertMany(exerciseslist);

    assert.equal(exerciseslist.length, result.insertedCount);
    // console.log("Here is", exerciseslist)
  } catch (err) {
    console.log(err);
  }

  client.close();
};

batchImport();

module.exports = { batchImport };
