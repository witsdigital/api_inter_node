require('dotenv/config');

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : process.env.HOST_KEY,
      user : process.env.USER_KEY,
      password : process.env.PASSWORD_KEY,
      database : process.env.DATABASE_KEY
    }
  });

module.exports = function() {

    return knex;
};
