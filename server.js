const express = require("express");
// const helmet = require("helmet");
// const db = require("./data/dbConfig.js");

const carRouter = require("./car-router");

const server = express();

server.use(express.json());

// server.use(helmet());

server.use("/api/cars", carRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's check on some cars </h2>`);
});

module.exports = server;
