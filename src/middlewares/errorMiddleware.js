'use strict';

const { ApiError } = require('../exeptions/api.error');

const errorMiddleware = (error, req, res, next) => {
  if (error instanceof ApiError) {
    res.status(error.status)
      .send({
        message: error.message,
        errors: error.errors,
      });
  }

  res.statusCode = 500;

  res.send({
    message: 'Server error',
  });
};

module.exports = {
  errorMiddleware,
};
