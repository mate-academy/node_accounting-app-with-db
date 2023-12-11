'use strict';

const { Sequelize } = require('sequelize');

const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
    // eslint-disable-next-line no-console
    logging: (...msg) => console.log(msg),
  });

module.exports = {
  sequelize,
};
