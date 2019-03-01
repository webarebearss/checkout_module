const faker = require('faker');
const fs = require('fs');
const ObjectsToCsv = require('objects-to-csv');

const createListing = () => ({
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

const createBooking = () => ({
  checkin: `03-${faker.random.number({'min': 10, 'max': 21})}-2019`,
  checkout: `03-${faker.random.number({'min': 24, 'max': 31})}-2019`,
  numGuests: faker.random.number({'min': 1, 'max': 8}),
  total: faker.random.number({'min': 100, 'max': 3000}),
  listing_id: faker.random.number({'min': 1, 'max': 10000000})
})

const createBooking2 = () => ({
  checkin: `03-${faker.random.number({'min': 26, 'max': 31})}-2019`,
  checkout: `04-${faker.random.number({'min': 1, 'max': 10})}-2019`,
  numGuests: faker.random.number({'min': 1, 'max': 8}),
  total: faker.random.number({'min': 100, 'max': 3000}),
  listing_id: faker.random.number({'min': 1, 'max': 10000000})
})

const createBookings = () => ([
  {
    checkin: '04-1' + faker.random.number({'min': 1, 'max': 3}) + '-2019',
    checkout: '04-1' + faker.random.number({'min': 5, 'max': 9}) + '-2019',
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 5000})
  },
  {
    checkin: '03-' + faker.random.number({'min': 15, 'max': 20}) + '-2019',
    checkout: '03-' + faker.random.number({'min': 22, 'max': 30}) + '-2019',
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 5000})
  },
  {
    checkin: '03-' + faker.random.number({'min': 1, 'max': 9}) + '-2019',
    checkout: '03-' + faker.random.number({'min': 5, 'max': 9}) +'-2019',
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 5000})
  },
  {
    checkin: `03-${faker.random.number({'min': 10, 'max': 15})}-2019`,
    checkout: `03-${faker.random.number({'min': 18, 'max': 27})}-2019`,
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 5000})
  },
  {
    checkin: `03-${faker.random.number({'min': 25, 'max': 30})}-2019`,
    checkout: `04-${faker.random.number({'min': 1, 'max': 10})}-2019`,
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 5000})
  },
  {
    checkin: `03-${faker.random.number({'min': 18, 'max': 22})}-2019`,
    checkout: `03-${faker.random.number({'min': 24, 'max': 30})}-2019`,
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 5000})
  },
  {
    checkin: `05-${faker.random.number({'min': 25, 'max': 30})}-2019`,
    checkout: `06-${faker.random.number({'min': 1, 'max': 6})}-2019`,
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 5000})
  },
  {
    checkin: `04-${faker.random.number({'min': 25, 'max': 30})}-2019`,
    checkout: `05-${faker.random.number({'min': 1, 'max': 10})}-2019`,
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 5000})
  },
  {
    checkin: `04-${faker.random.number({'min': 10, 'max': 15})}-2019`,
    checkout: `04-${faker.random.number({'min': 17, 'max': 22})}-2019`,
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 5000})
  },
  {
    checkin: `05-${faker.random.number({'min': 1, 'max': 10})}-2019`,
    checkout: `05-${faker.random.number({'min': 13, 'max': 20})}-2019`,
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 5000})
  }
])


const listings = fs.createWriteStream('db/mariadb/listings.csv');
const bookings = fs.createWriteStream('db/mariadb/bookings.csv');

(async() => {
  const fakeListings = [];
  let fakeBookings = [];
  const desiredFakeData = 10000;
  for (let i = 0; i < desiredFakeData; i++) {
    fakeListings.push(createListing());
  }
  let desiredBookings = faker.random.number({'min': Math.floor(desiredFakeData*0.01), 'max': Math.floor(desiredFakeData*0.08)});
  for (let i = 0; i < desiredBookings; i++) {
    fakeBookings = fakeBookings.concat(createBookings());
  }

  await new ObjectsToCsv(fakeListings).toDisk('./db/mariadb/listings.csv')
  await new ObjectsToCsv(fakeBookings).toDisk('./db/mariadb/bookings.csv')
})();
