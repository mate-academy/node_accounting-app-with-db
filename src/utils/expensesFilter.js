'use strict';

const expensesService = require('../services/expenses.services');

function isDateAfter(dateToCheck, referenceDate) {
  const dateA = new Date(dateToCheck).valueOf();
  const dateB = new Date(referenceDate).valueOf();

  return dateA > dateB;
}

function isDateBefore(dateToCheck, referenceDate) {
  const dateA = new Date(dateToCheck).valueOf();
  const dateB = new Date(referenceDate).valueOf();

  return dateA < dateB;
}

const expensesFilter = async({
  userId,
  from,
  to,
  categories,
}) => {
  let expenses = await expensesService.getAll();

  if (userId) {
    expenses = expenses
      .filter(expense => expense.userId === Number(userId));
  }

  if (categories) {
    if (Array.isArray(categories)) {
      expenses = expenses
        .filter(({ category }) => categories.includes(category));
    } else {
      expenses = expenses
        .filter(({ category }) => category === categories);
    }
  }

  if (from) {
    expenses = expenses.filter(({ spentAt }) => isDateAfter(spentAt, from));
  }

  if (to) {
    expenses = expenses.filter(({ spentAt }) => isDateBefore(spentAt, to));
  }

  return expenses;
};

module.exports = {
  expensesFilter,
};
