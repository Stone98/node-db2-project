exports.seed = function (knex) {
  return knex("cars")
    .truncate()
    .then(function () {
      return knex("cars").insert([
        {
          vin: "4T1BD1EBXEU083252",
          make: "Chevrolet",
          model: "Sonic",
          mileage: 100000,
        },
        {
          vin: "1HGFA46566L041260",
          make: "Kia",
          model: "Rio",
          mileage: 150000,
          title: "salvage",
          transmission: "automatic",
        },
        {
          vin: "1J4GL48K86W227214",
          make: "Jeep",
          model: "Wrangler",
          mileage: 500000,
          transmission: "manual",
        },
      ]);
    });
};
