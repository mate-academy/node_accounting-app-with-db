'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('matepostgres', 'postgres', 'lek', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports.sequelize = sequelize;
