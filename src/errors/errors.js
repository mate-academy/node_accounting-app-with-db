const { httpStatus } = require('../static/vocab');

class NotFoundError extends Error {
  constructor(entity, id) {
    super(`${entity} with id ${id} not found`, 404);
    this.entity = entity;
    this.id = id;
    this.statusCode = httpStatus.notFound;
  }
}

class ValidationError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class MaxSizeError extends Error {
  constructor() {
    super('Request body too large');
    this.statusCode = httpStatus.badRequest;
  }
}

class NotJSON extends Error {
  constructor() {
    super('Expected to receive JSON');
    this.statusCode = httpStatus.badRequest;
  }
}

class RequestCancel extends Error {
  constructor() {
    super('Request cancelled');
    this.statusCode = httpStatus.badRequest;
  }
}

module.exports = {
  NotFoundError,
  ValidationError,
  MaxSizeError,
  NotJSON,
  RequestCancel,
};
