'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '133043', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

try {
  sequelize.authenticate({ logging: false });
  global.console.log('Connection has been established successfully.');
} catch (error) {
  global.console.error('Unable to connect to the database:', error);
}

module.exports = {
  sequelize,
};
