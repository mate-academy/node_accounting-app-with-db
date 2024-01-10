'use strict';

class ApiError extends Error {
  constructor({ message, status, errors = {} }) {
    super(message);

    this.status = status;
    this.errors = errors;
  }

  static badRequest(message, errors) {
    return new ApiError({
      message,
      errors,
      status: 400,
    });
  }

  static notFound(errors) {
    return new ApiError({
      message: 'Not found',
      errors,
      status: 404,
    });
  }

  static cannotCreate() {
    return new ApiError({
      message: 'Cannot create',
      status: 404,
    });
  }

  static cannotUpdate() {
    return new ApiError({
      message: 'Cannot update',
      status: 404,
    });
  }
}

module.exports = {
  ApiError,
};
