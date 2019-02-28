const faker = require('faker');

const createFakeListings = () => ({
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

const createFakeBookings = () => ([
  {
    checkin: '04-14-2019',
    checkout: '04-18-2019',
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 100})
  },
  {
    checkin: '03-20-2019',
    checkout: '03-27-2019',
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 100})
  },
  {
    checkin: '03-05-2019',
    checkout: '03-10-2019',
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 100})
  },
  {
    checkin: '03-11-2019',
    checkout: '03-15-2019',
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 100})
  },
  {
    checkin: '03-29-2019',
    checkout: '04-05-2019',
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 100})
  },
  {
    checkin: '03-29-2019',
    checkout: '04-05-2019',
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 100})
  },
  {
    checkin: '06-15-2019',
    checkout: '06-18-2019',
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 100})
  },
  {
    checkin: '04-29-2019',
    checkout: '05-05-2019',
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 100})
  },
  {
    checkin: '04-20-2019',
    checkout: '04-25-2019',
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 100})
  },
  {
    checkin: '05-29-2019',
    checkout: '06-05-2019',
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 100})
  }
])

exports.seed = async function(knex, Promise) {
  const fakeListings = [];
  let fakeBookings = [];
  const desiredFakeData = 100;
  for (let i = 0; i < desiredFakeData; i++) {
    fakeListings.push(createFakeListings());
  }
  let desiredBookings = faker.random.number({'min': Math.floor(desiredFakeData*0.01), 'max': Math.floor(desiredFakeData*0.08)});
  for (let i = 0; i < desiredBookings; i++) {
    fakeBookings = fakeBookings.concat(createFakeBookings());
  }
  console.log(desiredBookings, fakeBookings.length);
  await knex('listings')
    .insert(fakeListings);
  await knex('bookings')
    .insert(fakeBookings);
};
