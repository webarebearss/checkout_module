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

exports.seed = async function(knex, Promise) {
  const fakeData = [];
  const desiredFakeData = 100;
  for (let i = 0; i < desiredFakeData; i++) {
    fakeData.push(createFakeData());
  }
  await knex('listings')
    .insert(fakeData);
};

