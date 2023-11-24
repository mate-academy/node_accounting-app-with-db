'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '123456', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = {
  sequelize,
};

// const client = new Client({
//   host: 'localhost',
//   user: 'postgres',
//   password: '123456',
//   database: 'postgres',
// });
