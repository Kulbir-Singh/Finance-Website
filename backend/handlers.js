const { MongoClient } = require("mongodb");
require("dotenv").config();
const assert = require("assert");

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUserInfo = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("posts");
    const result = await db.collection("users").insertOne(req.body);
    assert.equal(result.length, result.insertedCount);
    console.log("this is the body", req.body);
    res.status(200).json({ status: 200, data: req.body });
  } catch (err) {
    console.log(err);
  }
  client.close();
};

module.exports = { addUserInfo };
