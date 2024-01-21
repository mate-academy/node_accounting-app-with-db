'use strict';

const getFilteredExpenses = (
  expensesRecived,
  userId,
  categories,
  from,
  to,
) => {
  let expenses = expensesRecived.slice(0);

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === userId);
  }

  if (categories) {
    const categoriesArray = categories.split(',');

    expenses = expenses.filter(expense => (
      categoriesArray.includes(expense.category)
    ));
  }

  if (from) {
    const fromDate = new Date(from);

    expenses = expenses.filter(expense => (
      new Date(expense.spentAt) >= fromDate
    ));
  }

  if (to) {
    const toDate = new Date(to);

    expenses = expenses.filter(expense => new Date(expense.spentAt) <= toDate);
  }

  return expenses;
};

module.exports = { getFilteredExpenses };
