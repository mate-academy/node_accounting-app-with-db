'use strict';

const filterByQuery = (params, items) => {
  const { userId, from, to, categories } = params;
  let newExpenses = [...items];

  if (userId) {
    newExpenses = newExpenses.filter(exp => exp.userId === +userId);
  }

  if (categories) {
    newExpenses = newExpenses.filter(exp => exp.category === categories);
  }

  if (from && to) {
    newExpenses = newExpenses
      .filter(exp => exp.spentAt > from && exp.spentAt < to);
  }

  return newExpenses;
};

module.exports = {
  filterByQuery,
};
