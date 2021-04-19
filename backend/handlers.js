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

const getUserInfo = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("posts");
    const result = await db.collection("users").findOne({ uid: req.body.uid });
    res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err);
  }
  client.close();
};

const getFriends = async (req, res) => {
  console.log("this is", req.body.data);
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("posts");
    const result = await db.collection("users").find().toArray();
    console.log(result);
    let uid = req.body.data;
    let friends = result.filter(
      (friend) => friend.following.filter((user) => uid === user).length > 0
    );
    // console.log("this is the friends list", friends);
    res.status(200).json({ status: 200, data: friends });
  } catch (err) {
    console.log(err);
  }
};

const getAllUsers = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("posts");
    const result = await db.collection("users").find().toArray();
    console.log(result);
    res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err);
  }
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

const addToSharedPosts = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("posts");
    let { from, user, to, isread, url, photo, content, message } = req.body;
    let ans = await db.collection("shared_posts").findOne({ from });
    console.log("this is the ans", ans);
    if (!ans) {
      const doc = {
        from: from,
        shared: [{ user, to, isread, url, photo, content, message }],
      };
      await db.collection("shared_posts").insertOne(doc);
    } else {
      let duplicate = ans.shared.find((share) => {
        return share.url === url;
      });
      if (!duplicate) {
        await db.collection("shared_posts").updateOne(
          { from },
          {
            $push: {
              shared: {
                user,
                to,
                isread,
                url,
                photo,
                content,
                message,
              },
            },
          }
        );
      }
    }
    res.status(200).json({ status: 200, data: req.body });
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

module.exports = {
  addUserInfo,
  addToBookmarked,
  getAllBookmarked,
  getUserInfo,
  getAllUsers,
  getFriends,
  addToSharedPosts,
};
