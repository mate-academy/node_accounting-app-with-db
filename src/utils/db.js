'use strict';

const { Sequelize } = require('sequelize');

const sequilize = new Sequelize('postgres', 'postgres', '666sv666', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports.sequilize = sequilize;
