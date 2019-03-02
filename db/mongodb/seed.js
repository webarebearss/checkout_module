const faker = require('faker');
const mongoose = require('mongoose');
const Listing = require('./schema').Listing;
const Booking = require('./schema').Booking;

const createListing = (i) => ({
  id: i,
  price: faker.random.number({
    'min': 70,
    'max': 250
  }),
  stars: faker.finance.amount(3,5,2),
  reviews: faker.random.number({
    'min': 10,
    'max': 300
  }),
  cleaningFee: faker.random.number({
    'min': 30,
    'max': 70
  }),
  serviceFee: faker.random.number({
    'min': 50,
    'max': 100
  }),
  guests: faker.random.number({
    'min': 1,
    'max': 8
  }),
  minNights: faker.random.number({
    'min': 1,
    'max': 3
  }),
  title: faker.name.firstName() + `'s ` + faker.company.catchPhraseAdjective() + ' Home',
  address: faker.address.city(),
  highlights: faker.lorem.paragraph(nb_sentences=faker.random.number({'min': 1, 'max': 4})),
  introDesc: faker.lorem.paragraph(nb_sentences=5, variable_nb_sentences=true),
  spaceDesc: faker.lorem.paragraphs(nb=faker.random.number({'min': 1, 'max': 6})),
  guestDesc: faker.lorem.paragraphs(nb=faker.random.number({'min': 1, 'max': 3})),
  otherDesc: faker.lorem.paragraphs(nb=faker.random.number({'min': 1, 'max': 3}))
});

let min = 1;
let max = 10000000;

const createBooking = (i) => ({
  id: i,
  checkin: `03-${faker.random.number({'min': 10, 'max': 21})}-2019`,
  checkout: `03-${faker.random.number({'min': 24, 'max': 31})}-2019`,
  numGuests: faker.random.number({'min': 1, 'max': 8}),
  total: faker.random.number({'min': 100, 'max': 3000}),
  listing_id: faker.random.number({'min': min, 'max': max})
})

const createBooking2 = (i) => ({
  id: i,
  checkin: `03-${faker.random.number({'min': 26, 'max': 31})}-2019`,
  checkout: `04-${faker.random.number({'min': 1, 'max': 10})}-2019`,
  numGuests: faker.random.number({'min': 1, 'max': 8}),
  total: faker.random.number({'min': 100, 'max': 3000}),
  listing_id: faker.random.number({'min': min, 'max': max})
})

const createBooking3 = (i) => ({
  id: i,
  checkin: `04-${faker.random.number({'min': 1, 'max': 10})}-2019`,
  checkout: `04-${faker.random.number({'min': 12, 'max': 28})}-2019`,
  numGuests: faker.random.number({'min': 1, 'max': 8}),
  total: faker.random.number({'min': 100, 'max': 3000}),
  listing_id: faker.random.number({'min': min, 'max': max})
})

const createBooking4 = (i) => ({
  id: i,
  checkin: `04-${faker.random.number({'min': 15, 'max': 20})}-2019`,
  checkout: `04-${faker.random.number({'min': 22, 'max': 30})}-2019`,
  numGuests: faker.random.number({'min': 1, 'max': 8}),
  total: faker.random.number({'min': 100, 'max': 3000}),
  listing_id: faker.random.number({'min': min, 'max': max})
})

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rooms', { useNewUrlParser: true })
  .then(async () => {
    let count = 0;
    let start = Date.now();
    let iStart = 1;
    let iEnd = 100000;
    let increment = () => {
      count++;
      iStart += 100000;
      iEnd += 100000;
    }
    while (count <= 100) {
      let fakeListings = [];
      let fakeBookings = [];
      for (let i = iStart; i <= iEnd; i++) {
        fakeListings.push(createListing(i));
        if(i%5 === 0) {
          fakeBookings.push(createBooking(i));
        } else if (i%16 === 0) {
          fakeBookings.push(createBooking3(i));
        } else if (i%22 === 0) {
          fakeBookings.push(createBooking4(i));
        } else {
          fakeBookings.push(createBooking2(i));
        }
      }
      await Listing.insertMany(fakeListings);
      await Booking.insertMany(fakeBookings);
      await increment();
    }
    let end = Date.now();
    let min = (start - end) * -1.666e-5;
    let sec = Math.floor((min - Math.floor(min)) * 60);
    console.log(`Total Time to seed db: ${Math.floor(min)} minutes ${sec} seconds`);
    process.exit();
  })
  .catch(err => {
    console.log('ERROR: ', err);
    process.exit();
  })
