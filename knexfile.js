const pw = require('./config.js').pw;
const user = require('./config.js').user;

module.exports = {
  test: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: user,
      password: pw,
      database: 'rooms'
    },
    migrations: {
      directory: __dirname + '/db/mariadb/migrations'
    },
    seeds: {
      directory: __dirname + '/db/mariadb/seeds/development'
    }
  },
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: user,
      password: pw,
      database: 'rooms'
    },
    migrations: {
      directory: './db/mariadb/migrations'
    },
    seeds: {
      directory: './db/mariadb/seeds/development'
    }
  }
}
