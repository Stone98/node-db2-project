const router = require("express").Router();
const mw = require("./cars-middleware");
const Car = require("./cars-model");

router.get("/", async (req, res, next) => {
  Car.getAll()
    .then((cars) => {
      res.json(cars);
    })
    .catch(next);
});

router.get("/:id", mw.checkCarId, (req, res) => {
  res.json(req.car);
});

router.post(
  "/",
  mw.checkCarPayload,
  mw.checkVinNumberUnique,
  mw.checkVinNumberValid,
  (req, res, next) => {
    Car.create(req.body)
      .then((car) => {
        res.status(201).json(car);
      })
      .catch(next);
  }
);

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  res.status(500).json({
    message: "something went wrong inside the cars router",
    errMessage: err.message,
  });
});

module.exports = router;
