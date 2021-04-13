const db = require("../../data/db-config");

const getAll = () => {
  return db("cars"); // returns all cars in the database
};

const getById = (id) => {
  return db("cars").where("id", id).first(); // returns the car who's id matched the id given first
};

const create = async (car) => {
  const [id] = await db("cars").insert(car); // id variable that can access the newly created car
  return getById(id); // returns the newly created car
};

module.exports = {
  getAll,
  getById,
  create,
};
