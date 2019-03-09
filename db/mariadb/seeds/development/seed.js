const faker = require('faker');

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

let target = 10000000;
let minTarget = 1;

const createBookings = () => ([
  {
    checkin: '04-1' + faker.random.number({'min': 1, 'max': 3}) + '-2019',
    checkout: '04-1' + faker.random.number({'min': 5, 'max': 9}) + '-2019',
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': minTarget, 'max': target})
  },
  {
    checkin: '03-' + faker.random.number({'min': 15, 'max': 20}) + '-2019',
    checkout: '03-' + faker.random.number({'min': 22, 'max': 30}) + '-2019',
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': minTarget, 'max': target})
  },
  {
    checkin: '03-' + faker.random.number({'min': 1, 'max': 9}) + '-2019',
    checkout: '03-' + faker.random.number({'min': 5, 'max': 9}) +'-2019',
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': minTarget, 'max': target})
  },
  {
    checkin: `03-${faker.random.number({'min': 10, 'max': 15})}-2019`,
    checkout: `03-${faker.random.number({'min': 18, 'max': 27})}-2019`,
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': minTarget, 'max': target})
  },
  {
    checkin: `03-${faker.random.number({'min': 25, 'max': 30})}-2019`,
    checkout: `04-${faker.random.number({'min': 1, 'max': 10})}-2019`,
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': minTarget, 'max': target})
  },
  {
    checkin: `03-${faker.random.number({'min': 18, 'max': 22})}-2019`,
    checkout: `03-${faker.random.number({'min': 24, 'max': 30})}-2019`,
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': minTarget, 'max': target})
  },
  {
    checkin: `05-${faker.random.number({'min': 25, 'max': 30})}-2019`,
    checkout: `06-${faker.random.number({'min': 1, 'max': 6})}-2019`,
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': minTarget, 'max': target})
  },
  {
    checkin: `04-${faker.random.number({'min': 25, 'max': 30})}-2019`,
    checkout: `05-${faker.random.number({'min': 1, 'max': 10})}-2019`,
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': minTarget, 'max': target})
  },
  {
    checkin: `04-${faker.random.number({'min': 10, 'max': 15})}-2019`,
    checkout: `04-${faker.random.number({'min': 17, 'max': 22})}-2019`,
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': minTarget, 'max': target})
  },
  {
    checkin: `05-${faker.random.number({'min': 1, 'max': 10})}-2019`,
    checkout: `05-${faker.random.number({'min': 13, 'max': 20})}-2019`,
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': minTarget, 'max': target})
  }
])

exports.seed = async function(knex, Promise) {
  count = 0;
  let start = Date.now();
  let increment = () => {
    count++;
  }
  while (count <= 2000) {
    const fakeListings = [];
    let fakeBookings = [];
    const desiredFakeData = 5000;
    for (let i = 0; i < desiredFakeData; i++) {
      fakeListings.push(createListing());
      fakeBookings = fakeBookings.concat(createBookings());
    }
    await knex('listings')
      .insert(fakeListings);
    await knex('bookings')
      .insert(fakeBookings);
    await increment();
  }
  let end = Date.now();
  let min = (start - end) * -1.666e-5;
  let sec = Math.floor((min - Math.floor(min)) * 60);
  console.log(`Total Time to seed db: ${Math.floor(min)} minutes ${sec} seconds`);
};
