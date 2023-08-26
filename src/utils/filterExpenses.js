'use strict';

const { BadRequest, NotFound } = require('http-errors');
const usersService = require('../services/users');

async function filterExpensesByUserId({
  expenses,
  userId,
}) {
  if (isNaN(userId)) {
    throw new BadRequest('Invalid user id');
  }

  const foundUser = await usersService.getById(+userId);

  if (!foundUser) {
    throw new NotFound('User not found');
  }

  return expenses.filter(
    expense => expense.userId === +userId);
}

function filterExpensesInDateRange({
  expenses,
  from,
  to,
}) {
  if (new Date(from).toString() === 'Invalid Date') {
    throw new BadRequest('Invalid \'From\' Date');
  }

  if (new Date(to).toString() === 'Invalid Date') {
    throw new BadRequest('Invalid \'To\' Date');
  }

  return expenses.filter(expense => {
    const expenseTime = new Date(expense.spentAt).getTime();
    const fromTime = new Date(from).getTime();
    const toTime = new Date(to).getTime();

    return expenseTime >= fromTime && expenseTime <= toTime;
  });
}

function filterExpensesByCategory({
  expenses,
  categories,
}) {
  if (typeof categories !== 'string') {
    throw new BadRequest('Category must be a string');
  }

  return expenses.filter(
    expense => expense.category === categories);
}

module.exports = {
  filterExpensesByUserId,
  filterExpensesInDateRange,
  filterExpensesByCategory,
};
