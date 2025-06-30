'use strict';

const statuses = {
  OK: {
    code: 200,
    message: 'OK',
  },
  CREATED: {
    code: 201,
    message: 'Created',
  },
  NO_CONTENT: {
    code: 204,
    message: 'No Content',
  },
  BAD_REQUEST: {
    code: 400,
    message: 'Bad Request',
  },
  NOT_FOUND: {
    code: 404,
    message: 'Not Found',
  },
};

module.exports = statuses;
