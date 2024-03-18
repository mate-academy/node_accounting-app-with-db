'use strict';

const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;

const USER_NOT_FOUND_MESSAGE = 'User not found';
const MISSING_PARAM_MESSAGE = 'Required parameter(s) missing';
const EXPENSE_NOT_FOUND_MESSAGE = 'Expense not found';

module.exports = {
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  NOT_FOUND,
  USER_NOT_FOUND_MESSAGE,
  MISSING_PARAM_MESSAGE,
  EXPENSE_NOT_FOUND_MESSAGE,
};
