'use strict';

const { ValidationError, ForeignKeyConstraintError } = require('sequelize');
const { ApiError } = require('../exceptions/ApiError');

const errorMiddleware = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    const { errors } = error;

    return res.status(400).send({
      message: 'Validation Error',
      errors,
    });
  }

  if (error instanceof ForeignKeyConstraintError) {
    return res.status(404).send({ message: 'Not Found' });
  }

  if (error instanceof ApiError) {
    const { status, message, errors } = error;

    return res.status(status).send({
      message,
      errors,
    });
  }

  res.status(500).send({ message: 'Unexpected Error' });
};

module.exports = { errorMiddleware };
