'use strict';

const getFilteredExpenses = (expenses, filterParams) => {
  const { userId, categories, from, to } = filterParams;
  const filteredExpenses = expenses.filter(expense => {
    if (userId && expense.userId !== +userId) {
      return false;
    }

    if (categories && !categories.includes(expense.category)) {
      return false;
    }

    if (from && expense.spentAt < from) {
      return false;
    }

    if (to && expense.spentAt > to) {
      return false;
    }

    return true;
  });

  return filteredExpenses;
};

module.exports = { getFilteredExpenses };
