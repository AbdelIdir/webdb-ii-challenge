exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cars").insert([
        {
          name: "Aston",
          VIN: 933,
          make_model: "2019",
          mileage: 55,
          transmission_type: "automatic",
          status_of_title: "new"
        },
        {
          name: "Ferrari",
          VIN: 2289,
          make_model: "2018",
          mileage: 130,
          transmission_type: "automatic",
          status_of_title: "new"
        }
      ]);
    });
};
