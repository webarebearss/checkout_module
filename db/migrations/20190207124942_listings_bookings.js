
exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTable('listings', function(table) {
      table.increments('id').primary();
      table.integer('price');
      table.integer('stars');
      table.integer('reviews');
      table.integer('cleaningFee');
      table.integer('serviceFee');
      table.integer('guests');
    }),

    knex.schema.createTable('bookings', function(table) {
      table.increments('id').primary();
      table.string('checkin');
      table.string('checkout');
      table.integer('listing_id').unsigned()
        .references('listings.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('bookings'),
    knex.schema.dropTable('listings')
  ]);
};