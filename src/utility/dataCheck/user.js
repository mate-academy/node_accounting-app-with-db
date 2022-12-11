'use strict';

function checkUserName(name) {
  const error = {
    errors: [],
  };

  if (name && typeof name !== 'string') {
    error.errors.push('user name is not valid, expected string');
  }

  if (!name) {
    error.errors.push('name is not passed');
  }

  return error;
}

function checkUserId(userId) {
  const error = {
    errors: [],
  };

  if (isNaN(+userId)) {
    error.errors.push('user id not valid, expect number');
  }

  return error;
}

function checkUserData(name, userId) {
  const errorName = checkUserName(name);

  const errorId = checkUserId(userId);

  const error = {
    errors: [...errorName.errors, errorId.errors],
  };

  return error;
}

module.exports = {
  checkUserName, checkUserData, checkUserId,
};
