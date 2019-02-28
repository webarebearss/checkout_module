const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/rooms/:listingId', express.static(__dirname + '/../public'));

let port = 3000;

app.get('/rooms/bookings/:listingId', (req, res) => {
  db.getBookings(req.params.listingId).then(records => {
    res.send(records);
  });
});

app.route('/rooms/checkout/booking/:bookingId')
  .delete((req,res) => {
    db.deleteBooking(req.params.bookingId)
      .then(() => {
        res.end();
      })
  })
  .put((req, res) => {
    db.updateBooking(req.params.bookingId, req.body)
      .then(() => {
        res.end();
      });
  });

app.route('/rooms/checkout/:listingId')
  .delete((req, res) => {
    db.deleteListing(req.params.listingId)
      .then(() => {
        res.end();
      })
  })
  .post((req, res) => {
    db.bookRoom(req.params.listingId, req.body)
      .then(() => {
        res.end();
      })
  })
  .put((req, res) => {
    db.updateListing(req.params.listingId, req.body)
      .then(() => {
        res.end();
      })
  })
  .get((req, res) => {
    db.getRoom(req.params.listingId).then(records => {
      res.send(records);
    })
  });

var server = app.listen(port, function() {
  console.log(`listening on post ${port}`);
});

module.exports = server;
