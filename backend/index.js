"use strict";

const express = require("express");
const morgan = require("morgan");
const { addUserInfo } = require("./handlers");
const PORT = process.env.PORT || 4000;

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  .post("/getallusers", addUserInfo)
  // .get("*", (req, res) => {
  //   res.status(404).json({
  //     status: 404,
  //     message: "This is obviously not what you are looking for.",
  //   });
  // })
  .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))
  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
