const express = require("express");

const server = express();

const CarsRouter = require("./cars/cars-router");

server.use(express.json());

server.use("/api/cars", CarsRouter);

module.exports = server;
