const PORT = 3000;
require('dotenv').config();
const express = require("express");
const server = express();
const morgan = require("morgan");
const apiRouter = require("./api");
const { client } = require('./db')

client.connect();

server.use(morgan("dev"));
server.use(express.json());
server.use("/api", apiRouter);

server.listen(PORT, () => {
    console.log("The server is up on port", PORT);
  });