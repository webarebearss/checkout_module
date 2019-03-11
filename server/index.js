require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const compress = require('compression');
const cors = require('cors');
const db = require('./db');
// const redis = require('redis');
let port = 3000;

// const client = redis.createClient();
const app = express();

// const cache = (req,res,next) => {
//   let key = '__express__' + req.originalUrl || req.url;
//   client.get(key, (err, cachedBody) => {
//     if(cachedBody) {
//       res.send(JSON.parse(cachedBody));
//     } else {
//       res.sendResponse = res.send;
//       res.send = (body) => {
//         client.setex(key, 30, JSON.stringify(body));
//         res.sendResponse(body);
//       }
//       next();
//     }
//   })
// }

app.use(bodyParser.json());
app.use(compress());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/:listingId', express.static(__dirname + '/../public'));

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
  .get((req, res) => {
    db.getRoom(req.params.listingId)
      .then(records => {
        res.send(records);
      })
      .catch(err => console.log(err));
  });

var server = app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

module.exports = server;
