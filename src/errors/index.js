const { errorMsg } = require('./messages');
const {
  NotFoundError,
  ValidationError,
  MaxSizeError,
  NotJSON,
  RequestCancel,
} = require('./errors');
const { errorHandler } = require('./errorHandler');

module.exports = {
  errorMsg,
  NotFoundError,
  ValidationError,
  MaxSizeError,
  NotJSON,
  RequestCancel,
  errorHandler,
};
