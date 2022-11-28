'use strict';

const { usersController } = require('../controller/usersController');

async function expensePostErrors({
  userId, spentAt, title, amount, category, note,
}) {
  const error = {
    errors: [],
  };

  const hasUser = isNaN(userId)
    ? null
    : await usersController.getOne(userId);

  const hasMainParameters = title && amount && category;

  if (!hasMainParameters) {
    error.errors.push(('one or more of required parameters'
    + '(title, amount and category) are not passed'));
  }

  if (!hasUser) {
    error.errors.push('user does\'nt exist');
  }

  if (hasUser && typeof title !== 'string') {
    error.errors.push('title name is not valid, expected string');
  }

  if (hasUser && typeof category !== 'string') {
    error.errors.push('category name is not valid, expected string');
  }

  if (hasUser && typeof amount !== 'number') {
    error.errors.push('amount value is not valid, expected number');
  }

  if (hasUser && note && typeof note !== 'string') {
    error.errors.push('note value is not valid, expected string');
  }

  const date = spentAt
    ? new Date(spentAt)
    : false;

  if (hasUser && spentAt && !(date instanceof Date && !isNaN(date))) {
    error.errors.push('spent date is not valid,'
      + ' expected string YYYY-MM-DDTHH:MM:SS.MSZ'
      + ' where YYYY - year, MM - month, DD - day, T - constant'
      + ' and HH - hour, MM - minute, SS - second, MS - milisecond'
      + ', Z - constant');
  }

  return error;
}

function expensePatchErrors({
  spentAt, title, amount, category, note,
}) {
  const error = {
    errors: [],
  };

  const hasMainParameters = spentAt || title || amount || category || note;

  if (!hasMainParameters) {
    error.errors.push(('request body is empty'
    + ' at least one parameter is required'));
  }

  if (title && typeof title !== 'string') {
    error.errors.push('title name is not valid, expected string');
  }

  if (category && typeof category !== 'string') {
    error.errors.push('category name is not valid, expected string');
  }

  if (amount && typeof amount !== 'number') {
    error.errors.push('amount value is not valid, expected number');
  }

  if (note && typeof note !== 'string') {
    error.errors.push('note value is not valid, expected string');
  }

  const date = spentAt
    ? new Date(spentAt)
    : false;

  if (spentAt && !(date instanceof Date && !isNaN(date))) {
    error.errors.push('spent date is not valid,'
      + ' expected string YYYY-MM-DDTHH:MM:SS.MSZ'
      + ' where YYYY - year, MM - month, DD - day, T - constant'
      + ' and HH - hour, MM - minute, SS - second, MS - milisecond'
      + ', Z - constant');
  }

  return error;
}

module.exports = {
  expensePostErrors, expensePatchErrors,
};
