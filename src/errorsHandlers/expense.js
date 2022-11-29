'use strict';

const { usersService } = require('../services/users');

function checkTypeErrors(error, spentAt, title, amount, category, note) {
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

async function expensePostErrors(data) {
  const {
    userId, spentAt, title, amount, category, note,
  } = data;
  let error = {
    errors: [],
  };

  const hasUser = isNaN(+userId)
    ? null
    : await usersService.getOne(+userId);

  const hasMainParameters = title && amount && category;

  if (!hasMainParameters) {
    error.errors.push(('one or more of required parameters'
    + '(title, amount and category) are not passed'));
  }

  if (!hasUser) {
    error.errors.push('user does\'nt exist');
  }

  error = checkTypeErrors(
    error, spentAt, title, amount, category, note,
  );

  return error;
}

function expensePatchErrors(data) {
  const {
    spentAt, title, amount, category, note,
  } = data;
  let error = {
    errors: [],
  };

  const hasMainParameters = spentAt || title || amount || category || note;

  if (!hasMainParameters) {
    error.errors.push(('request body is empty'
    + ' at least one parameter is required'));
  }

  error = checkTypeErrors(
    error, spentAt, title, amount, category, note,
  );

  return error;
}

module.exports = {
  expensePostErrors, expensePatchErrors,
};
