'use strict';

const filterExpenses = (expenses, queryParams) => {
  let filteredExpenses = [...expenses];

  for (const key in queryParams) {
    switch (key) {
      case 'amount':
        filteredExpenses = filteredExpenses
          .filter(expense => expense[key] === +queryParams[key]);
        break;

      case 'from':
        filteredExpenses = filteredExpenses
          .filter(expense =>
            new Date(expense.spentAt) >= new Date(queryParams[key]));
        break;

      case 'to':
        filteredExpenses = filteredExpenses
          .filter(expense =>
            new Date(expense.spentAt) <= new Date(queryParams[key]));
        break;

      default:
        filteredExpenses = filteredExpenses
          .filter(expense => expense[key] === queryParams[key]);
        break;
    }
  }

  return filteredExpenses;
};

module.exports = {
  filterExpenses,
};
