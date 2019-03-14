require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
let port = 3001;
const cache = require('express-redis-cache')({port: 6379, host: process.env.REDIS_HOST});
const app = express();

app.get('*.gz', (req, res, next) => {
 res.set('Content-Encoding', 'gzip');
 res.set('Content-Type', 'text/javascript');
 next();
});

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/../public'));

app.post('/rooms/listings', (req, res) => {
  db.newListing(req.body)
    .then(() => {
      res.end();
    })
    .catch(err => console.log(err));
})

app.route('/rooms/bookings/:listingId')
  .delete((req,res) => {
    db.deleteBooking(req.params.bookingId)
      .then(() => {
        res.end();
      })
      .catch(err => console.log(err));
  })
  .put((req, res) => {
    db.updateBooking(req.params.bookingId, req.body)
      .then(() => {
        res.end();
      })
      .catch(err => console.log(err));
  })
  .post((req, res) => {
    db.bookRoom(req.params.listingId, req.body)
      .then(() => {
        res.end();
      })
      .catch(err => console.log(err));
  })
  .get((req,res) => {
    db.getBookings(req.params.listingId)
      .then(records => {
        res.send(records);
      })
      .catch(err => console.log(err));
  });



app.route('/rooms/:listingId')
  .delete((req, res) => {
    db.deleteListing(req.params.listingId)
      .then(() => {
        res.end();
      })
      .catch(err => console.log(err));
  })
  .put((req, res) => {
    db.updateListing(req.params.listingId, req.body)
      .then(() => {
        res.end();
      })
      .catch(err => console.log(err));
  })
  .get(cache.route(), (req, res) => {
    db.getRoom(req.params.listingId)
      .then(records => {
        res.send(records);
      })
      .catch(err => console.log(err));
  });

app.get('/loaderio-d95d28303953aa8e9650a1f50c90a974', (req, res) => {
  res.send('loaderio-d95d28303953aa8e9650a1f50c90a974');
  res.end();
})


var server = app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

module.exports = server;
