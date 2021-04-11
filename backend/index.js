"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 4000;

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // .get("*", (req, res) => {
  //   res.status(404).json({
  //     status: 404,
  //     message: "This is obviously not what you are looking for.",
  //   });
  // })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
