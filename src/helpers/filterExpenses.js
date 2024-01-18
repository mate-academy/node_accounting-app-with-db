'use strict';

function filterExpenses(expenses, categories, userId, from, to) {
  let filteredExpenses = [...expenses];

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      expense => categories.includes(expense.category)
    );
  }

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      expense => expense.userId === +userId
    );
  }

  if (from && to) {
    const toDate = new Date(to);
    const fromDate = new Date(from);

    filteredExpenses = filteredExpenses.filter(
      expense => {
        const spentDate = new Date(expense.spentAt);

        return spentDate >= fromDate
          && spentDate <= toDate;
      }
    );
  }

  return filteredExpenses;
}

module.exports = {
  filterExpenses,
};
