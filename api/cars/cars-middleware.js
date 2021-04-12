const Car = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  try {
    const car = await Car.getById(req.params.id);
    if (!car) {
      res
        .status(404)
        .json({ message: `car with id ${req.params.id} is not found` });
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: "missing car data" });
  } else if (!req.body.vin) {
    res.status(400).json({ message: "vin is missing" });
  } else if (!req.body.make) {
    res.status(400).json({ message: "make is missing" });
  } else if (!req.body.model) {
    res.status(400).json({ message: "model is missing" });
  } else if (!res.body.mileage) {
    res.status(400).json({ message: "mileage is missing" });
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  if (!vinValidator.validate(req.body.vin)) {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
  } else {
    next();
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body;
  const vinExists = await Car.getAll().where({ vin }).first();
  if (vinExists) {
    res.status(400).json({ message: `cin ${vin} already exists` });
  } else {
    next();
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
