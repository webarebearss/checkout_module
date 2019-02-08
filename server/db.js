var config = require('../knexfile.js');
var env = 'development';
var knex = require('knex')(config[env]);

const getUsers = (listingId) => {
  return knex
    .from('listings')
    .where ({id: listingId})
    .limit(1)
    .then(records => {
      return records;
    });
}

module.exports = knex;
module.exports.getUsers = getUsers;

knex.migrate.latest([config]);