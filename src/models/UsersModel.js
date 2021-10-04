var connectionFactory = require('../config/conection_mysql');
const knex = connectionFactory();
const md5 = require('md5');

module.exports = {
  login_painel: async function (obj) {
    return knex.select().table('usuario')
      .where('email', obj.email)
      .andWhere('senha', md5(obj.senha))
      .andWhere('status_usuario', 1)
      .then(rows => {
        return rows;
      }).catch(err => {
        console.log(err)
        return err;
      });
  },
  getUsers: async function (obj) {
    return knex.select().table('client')
      .orderBy('name', 'asc')
      .then(rows => {
        return rows;
      }).catch(err => {
        return err;
      });
  },
  getUsersFilter: async function (obj) {
    return knex.select().table('client')
      .where(obj)
      .orderBy('name', 'asc')
      .then(rows => {
        return rows;
      }).catch(err => {
        return err;
      });
  }
}
