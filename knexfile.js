module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'rooms'
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/development'
    }
  }
}