exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments();
    tbl
      .string("name")
      .notNullable()
      .unique();
    tbl
      .integer("vin")
      .notNullable()
      .unique();

    tbl.string("make_model").notNullable();
    tbl.float("mileage").notNullable();
    tbl.string("transmission_type");
    tbl.string("status_of_title");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
  //    knex.schema.createTable("cars")
};
