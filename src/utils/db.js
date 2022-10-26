'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'test124', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = { sequelize };
