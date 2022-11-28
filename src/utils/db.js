/* eslint-disable no-console */
'use strict';

require('dotenv').config();

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
    },
  },
});

module.exports = {
  sequelize,
};
