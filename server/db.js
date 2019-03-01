var config = require('../knexfile.js');
var env = process.env.NODE_ENV || 'development';
var knex = require('knex')(config[env]);

const getRoom = (listingId) => {
  return knex('listings')
    .where({id: listingId})
    .limit(1)
    .then(records => {
      return records;
    });
}

const getBookings = (listingId) => {
  return knex('bookings')
    .where ({listing_id: listingId})
    .then(records => {
      return records;
    });
}

const bookRoom = (listingId, reservation) => {
  return knex('bookings')
    .insert({checkin: reservation.checkIn, checkout: reservation.checkOut, numGuests: reservation.numGuests, total: reservation.total, listing_id: listingId});
}

const deleteBooking = (bookingId) => {
  return knex('bookings')
    .where('id', bookingId)
    .del()
}

const updateBooking = (bookingId, update) => {
  return knex('bookings')
    .where('id', bookingId)
    .update(update)
}

const deleteListing = (listingId) => {
  return knex('listings')
    .where({id: listingId})
    .del()
}

const updateListing = (listingId, updated) => {
  return knex('listings')
    .where({id: listingId})
    .update(updated)
}

const newListing = listing => {
  return knex('listings')
    .insert(listing)
}

module.exports = knex;
module.exports.getRoom = getRoom;
module.exports.bookRoom = bookRoom;
module.exports.getBookings = getBookings;
module.exports.updateListing = updateListing;
module.exports.deleteListing = deleteListing;
module.exports.deleteBooking = deleteBooking;
module.exports.updateBooking = updateBooking;
module.exports.newListing = newListing;
knex.migrate.latest([config]);
