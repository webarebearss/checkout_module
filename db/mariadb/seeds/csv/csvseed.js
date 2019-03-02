const faker = require('faker');
const fs = require('fs');
const ObjectsToCsv = require('objects-to-csv');
var env = process.env.NODE_ENV || 'development';

const createBookings = () => ([
  {
    checkin: '04-1' + faker.random.number({'min': 1, 'max': 3}) + '-2019',
    checkout: '04-1' + faker.random.number({'min': 5, 'max': 9}) + '-2019',
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 10927001})
  },
  {
    checkin: '03-' + faker.random.number({'min': 15, 'max': 20}) + '-2019',
    checkout: '03-' + faker.random.number({'min': 22, 'max': 30}) + '-2019',
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 10927001})
  },
  {
    checkin: '03-' + faker.random.number({'min': 1, 'max': 9}) + '-2019',
    checkout: '03-' + faker.random.number({'min': 5, 'max': 9}) +'-2019',
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 10927001})
  },
  {
    checkin: `03-${faker.random.number({'min': 10, 'max': 15})}-2019`,
    checkout: `03-${faker.random.number({'min': 18, 'max': 27})}-2019`,
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 10927001})
  },
  {
    checkin: `03-${faker.random.number({'min': 25, 'max': 30})}-2019`,
    checkout: `04-${faker.random.number({'min': 1, 'max': 10})}-2019`,
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 10927001})
  },
  {
    checkin: `03-${faker.random.number({'min': 18, 'max': 22})}-2019`,
    checkout: `03-${faker.random.number({'min': 24, 'max': 30})}-2019`,
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 10927001})
  },
  {
    checkin: `05-${faker.random.number({'min': 25, 'max': 30})}-2019`,
    checkout: `06-${faker.random.number({'min': 1, 'max': 6})}-2019`,
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 10927001})
  },
  {
    checkin: `04-${faker.random.number({'min': 25, 'max': 30})}-2019`,
    checkout: `05-${faker.random.number({'min': 1, 'max': 10})}-2019`,
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 10927001})
  },
  {
    checkin: `04-${faker.random.number({'min': 10, 'max': 15})}-2019`,
    checkout: `04-${faker.random.number({'min': 17, 'max': 22})}-2019`,
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 10927001})
  },
  {
    checkin: `05-${faker.random.number({'min': 1, 'max': 10})}-2019`,
    checkout: `05-${faker.random.number({'min': 13, 'max': 20})}-2019`,
    numGuests: faker.random.number({'min': 1, 'max': 8}),
    total: faker.random.number({'min': 100, 'max': 3000}),
    listing_id: faker.random.number({'min': 1, 'max': 10927001})
  }
])

exports.seed = async function(knex, Promise) {
  let start = Date.now();
  let count = 0;
  const deleteCsv = () => {
    fs.unlink('./db/mariadb/seeds/csv/bookings.csv', err => {
      if(err) {console.log('ERROR: ', err)}
    });
  }
  fs.createWriteStream('./db/mariadb/seeds/csv/bookings.csv');
  while (count < 10) {
    let fakeBookings = [];
    let desiredBookings = 100000; //this will create 1M bookings (10 bookings per loop)
    for (let i = 0; i < desiredBookings; i++) {
      fakeBookings = fakeBookings.concat(createBookings());
    }

    await new ObjectsToCsv(fakeBookings).toDisk('./db/mariadb/seeds/csv/bookings.csv')
    await knex.raw(`LOAD DATA LOCAL INFILE './db/mariadb/seeds/csv/bookings.csv'
    INTO TABLE rooms.bookings
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES
    (checkin, checkout, numGuests, total, listing_id)
    `)
    await deleteCsv();
    count++;
  }


  let end = Date.now();
  let min = (start - end) * -1.666e-5;
  let sec = Math.floor((min - Math.floor(min)) * 60);
  console.log(`Total Time to seed db: ${Math.floor(min)} minutes ${sec} seconds`);
};
