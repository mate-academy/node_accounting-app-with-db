'use strict';

const filterExpense = (expenses, { userId, categories, from, to }) => {
  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from) {
    filteredExpenses = filteredExpenses
      .filter(expense => new Date(expense.spentAt) >= new Date(from));
  }

  if (to) {
    filteredExpenses = filteredExpenses
      .filter(expense => new Date(expense.spentAt) <= new Date(to));
  }

  return filteredExpenses;
};

module.exports = {
  filterExpense,
};
