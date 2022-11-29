'use strict';

function userError(name, userId = 1) {
  const error = {
    errors: [],
  };

  if (name && typeof name !== 'string') {
    error.errors.push('user name is not valid, expected string');
  }

  if (!name) {
    error.errors.push('name is not passed');
  }

  if (isNaN(userId)) {
    error.errors.push('user id not valid');
  }

  return error;
}

module.exports = { userError };
