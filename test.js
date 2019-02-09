process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http')

chai.use(chaiHttp);

const server = require('./server');
const knex = require('./server/db.js');

describe('Routes: posts', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('Get rooms', () => {
    test('should return 1 result for each room query', async() => {
      var res = await chai.request(server).get('/rooms/1');
      expect(res.body.length).toEqual(1);
      res = await chai.request(server).get('/rooms/2');
      expect(res.body).toHaveLength(1);
    });

    test('should return an obj with room details', async() => {
      var res = await chai.request(server).get('/rooms/3');
      expect(res.body[0]).toHaveProperty('price');
      expect(res.body[0]).toHaveProperty('stars');
      expect(res.body[0]).toHaveProperty('reviews');
      expect(res.body[0]).toHaveProperty('guests');
      expect(res.body[0]).toHaveProperty('cleaningFee');
      expect(res.body[0]).toHaveProperty('serviceFee');
    });
  });

  describe('Get reservations', () => {
    test('should return an array', async() => {
      var res = await chai.request(server).get('/rooms/bookings/1');
      console.log(res.body);
      expect(res.body).toHaveLength(1);
    });

    test('should return an empty array if room has no reservations', async() => {
      var res = await chai.request(server).get('/rooms/bookings/4');
      expect(res.body).toHaveLength(0);
    });
  });
});