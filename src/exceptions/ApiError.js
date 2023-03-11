'use strict';

class ApiError extends Error {
  constructor(status, message, errors = {}) {
    super(message);

    this.status = status;
    this.errors = errors;
  }

  static NotFound() {
    return new ApiError(404, 'Not Found');
  }
};

module.exports = { ApiError };
