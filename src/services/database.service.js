'use strict';

const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.EXT_URL, {
  dialectOptions: {
    ssl: true,
  },
});

module.exports = sequelize;
