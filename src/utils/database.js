'use strict';

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
// eslint-disable-next-line max-len
const connectionURL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`;

const sequelize = new Sequelize(connectionURL, {
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
    },
  },
});

module.exports = {
  sequelize,
};
