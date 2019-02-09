const faker = require('faker');

const createFakeData = () => ({
  price: faker.random.number({
    'min': 70,
    'max': 150
  }),
  stars: faker.random.number({
    'min': 1,
    'max': 5
  }),
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
    'max': 4
  })
});

const fakeBookings = () => ({
  checkin: '2/' + faker.random.number({'min': 2, 'max': 5}).toString(),
  checkout: '2/' + faker.random.number({'min': 6, 'max': 10}).toString(),
  listing_id: 1
});


exports.seed = async function(knex, Promise) {
  const fakeBookings = [
    {
      checkin: '2/7',
      checkout: '2/10',
      listing_id: 1
    },
    {
      checkin: '2/12',
      checkout: '2/16'
      listing_id: 1
    },
    {
      checkin: '3/1',
      checkout: '3/5',
      listing_id: 2
    }
  ];
  const fakeData = [];
  const desiredFakeData = 100;
  for (let i = 0; i < desiredFakeData; i++) {
    fakeData.push(createFakeData());
  }
  await knex('listings')
    .insert(fakeData);
  await knex('bookings')
    .insert(fakeBookings);
};

