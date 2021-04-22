"use strict";

const express = require("express");
const morgan = require("morgan");
const {
  addUserInfo,
  addToBookmarked,
  getAllBookmarked,
  getUserInfo,
  getAllUsers,
  getFriends,
  getSharedArticles,
  IsRead,
  addToSharedPosts,
} = require("./handlers");
const PORT = process.env.PORT || 4000;

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  .post("/adduser", addUserInfo)
  .post("/addbookmark", addToBookmarked)
  .get("/allusers", getAllUsers)
  .get("/bookmarked", getAllBookmarked)
  .post("/getuser", getUserInfo)
  .post("/friendslist", getFriends)
  .post("/addToSharing", addToSharedPosts)
  .post("/sharedarticles", getSharedArticles)
  .post("/isread", IsRead)
  // .get("*", (req, res) => {
  //   res.status(404).json({
  //     status: 404,
  //     message: "This is obviously not what you are looking for.",
  //   });
  // })
  .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))
  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
