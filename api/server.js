const express = require("express");

const CarsRouter = require("./cars/cars-router");

const server = express();

// global middlewares
server.use(express.json());

// enables routes for cars
server.use("/api/cars", CarsRouter);

// catch all endpoint that indicates that server/api is up
server.use("*", (req, res) => {
  res.send(`<h1>API is up!</h1>`);
});

module.exports = server;
