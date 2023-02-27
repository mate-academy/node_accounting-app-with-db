'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '37t1Y739XX', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports.sequelize = sequelize;
