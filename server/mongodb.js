const mongoose = require('mongoose');
const Listing = require('./schema').Listing;
const Booking = require('./schema').Booking;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rooms', { useNewUrlParser: true })

const getRoom = (listingId) => {
  Listing.find({id: listingId}).exec((err, room) => {
    if(err) {
      console.log('ERROR: ', err);
    } else {
      console.log('getRoom', room);
      return room;
    }
  })
}

const getBookings = (listingId) => {
  Booking.find({listing_id: listingId}).exec((err, bookings) => {
    if(err) {
      console.log('ERROR: ', err);
    } else {
      console.log('get bookings', bookings);
      return bookings;
    }
  })
}

const bookRoom = (listingId, reservation) => {
  var lastId = Booking.count();
  console.log('id', lastId);
  reservation = { id: ++lastId,
    checkin: reservation.checkIn,
    checkout: reservation.checkOut,
    numGuests: reservation.numGuests,
    total: reservation.total,
    listing_id: listingId
  }
  var newReservation = new Booking(reservation);
  newReservation.save((err, data) => {
    if(err) {
      console.log('ERROR: ', err);
    }
  })
}

const updateListing = (listingId, update) => {
  Listing.find({id:listingId})
}

module.exports.getRoom = getRoom;
module.exports.bookRoom = bookRoom;
module.exports.getBookings = getBookings;
module.exports.updateListing = updateListing;
module.exports.deleteListing = deleteListing;
module.exports.deleteBooking = deleteBooking;
module.exports.updateBooking = updateBooking;
module.exports.newListing = newListing;
