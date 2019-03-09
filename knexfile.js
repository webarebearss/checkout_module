const config = require('./config.js');

module.exports = {
  test: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: config.user,
      password: config.pw,
      database: 'rooms'
    },
    migrations: {
      directory: __dirname + '/db/mariadb/migrations'
    },
    seeds: {
      directory: __dirname + './db/mariadb/seeds/development'
    }
  },
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: config.user,
      password: config.pw,
      database: 'rooms'
    },
    migrations: {
      directory: './db/mariadb/migrations'
    },
    seeds: {
      directory: './db/mariadb/seeds/development'
    }
  },
  production: {
    client: 'mysql',
    connection: {
      host: config.hostAWS,
      user: config.userAWS,
      password: config.pwAWS,
      database: 'rooms',
      port: 3306
    },
    migrations: {
      directory: './db/mariadb/migrations'
    },
    seeds: {
      directory: './db/mariadb/seeds/development'
    }
  },
}
