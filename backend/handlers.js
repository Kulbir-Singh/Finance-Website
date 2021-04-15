const { MongoClient, ObjectID } = require("mongodb");
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
    console.log("this is the length", result);
    assert.equal(1, result.insertedCount);
    res.status(200).json({ status: 200, data: req.body });
  } catch (err) {
    console.log(err);
  }
  client.close();
};

const updateUserInfo = async (req, res) => {};

const getAllBookmarked = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("posts");
    const result = await db.collection("bookmarked").find().toArray();
    res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err);
  }
};

const addToBookmarked = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("posts");
    let { uid, title, url, image } = req.body;
    let ans = await db.collection("bookmarked").findOne({ uid });
    console.log(ans);
    if (!ans) {
      const doc = { uid: uid, bookmarks: [{ title, url, image }] };
      await db.collection("bookmarked").insertOne(doc);
    } else {
      let duplicate = ans.bookmarks.find((bookmark) => {
        return bookmark.url === url;
      });
      if (!duplicate) {
        await db
          .collection("bookmarked")
          .updateOne({ uid }, { $push: { bookmarks: { title, url, image } } });
      }
    }
    res.status(200).json({ status: 200, data: req.body });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addUserInfo, addToBookmarked, getAllBookmarked };
