const Car = require("./cars-model");
const vinValidator = require("vin-validator");

// checks to see if the id of a car exists in the database, used to find individual cars
const checkCarId = async (req, res, next) => {
  try {
    // variable created if the id given is already in the database, variable will be undefined if no match found
    const car = await Car.getById(req.params.id);
    if (!car) {
      // sends error if id does not exists in the database
      res
        .status(404)
        .json({ message: `car with id ${req.params.id} is not found` });
    } else {
      // if id exists in the database, assigns car to req.car and moves on
      req.car = car;
      next();
    }
  } catch (err) {
    next(err);
  }
};

// checks to see if the correct req.body is sent to either insert or update a car
const checkCarPayload = (req, res, next) => {
  if (!req.body) {
    // sends error if nothing is provided in req.body
    res.status(400).json({ message: "missing car data" });
  } else if (!req.body.vin) {
    // sends error if nothing is provided for vin
    res.status(400).json({ message: "vin is missing" });
  } else if (!req.body.make) {
    // sends error if nothing is provided for make
    res.status(400).json({ message: "make is missing" });
  } else if (!req.body.model) {
    // sends error if nothing is provided for model
    res.status(400).json({ message: "model is missing" });
  } else if (!req.body.mileage) {
    // sends error if nothing is provided for mileage
    res.status(400).json({ message: "mileage is missing" });
  } else {
    // moves on if all the above are true
    next();
  }
};

// checks the vin to ensure it is in valid vin format
const checkVinNumberValid = (req, res, next) => {
  if (!vinValidator.validate(req.body.vin)) {
    // sends error if vin is invalid
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
  } else {
    // moves on if vin is valid
    next();
  }
};

// checks the database to see if vin of a car is unique and not already used
const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body; // destructuring vin from req.body
  // variable created if vin given exists in the database, variable will be undefined if no match found
  const vinExists = await Car.getAll().where("vin", vin).first();
  if (vinExists) {
    // sends error if vin is already being used by another car
    res.status(400).json({ message: `vin ${req.body.vin} already exists` });
  } else {
    // moves on if vin does not exists in database
    next();
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
