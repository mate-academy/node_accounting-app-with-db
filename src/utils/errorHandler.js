'use strict';

const { sequelize } = require('./db');

const errorHandler = (error, request, response, next) => {
  // Error handling middleware functionality
  // eslint-disable-next-line no-console
  console.log(error, request, response, next);
  sequelize.close();
};

module.exports = errorHandler;
