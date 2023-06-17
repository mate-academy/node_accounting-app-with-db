'use strict'

const usersService = require('../users');

const { isValidDate } = require('../../sharedValidation');

function validateExpenseData(expenseData) {
  const { userId, spentAt, title, amount, category } = expenseData;

  if (!usersService.getById(userId)) {
    throw new Error('User not found');
  }

  if (!spentAt || !title || !amount || !category) {
    throw new Error('Missing required fields');
  }

  if (!isValidDate(spentAt)) {
    throw new Error('Invalid date');
  }
}

module.exports = {
  validateExpenseData,
};
