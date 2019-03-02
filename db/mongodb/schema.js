const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  id: {type: Number, index: true},
  price: {type: Number, require: true},
  stars: {type: Number},
  reviews: {type: Number},
  cleaningFee: {type: Number, require: true},
  serviceFee: {type: Number, require: true},
  guests: {type: Number, require: true},
  minNights: {type: Number, require: true},
  title: {type: String, require: true},
  address: {type: String, require: true},
  highlights: {type: String, require: true},
  introDesc: {type: String, require: true},
  spaceDesc: {type: String, require: true},
  guestDesc: {type: String, require: true},
  otherDesc: {type: String, require: true}
});

const bookingSchema = new mongoose.Schema({
  id: {type: Number, index: true},
  checkin: {type: String, require: true},
  checkout: {type: String, require: true},
  numGuests: {type: Number, require: true},
  total: {type: Number, require: true},
  listing_id: {type: Number, require: true}
})



exports.Listing = mongoose.model('Listing', listingSchema);
exports.Booking = mongoose.model('Booking', bookingSchema);
