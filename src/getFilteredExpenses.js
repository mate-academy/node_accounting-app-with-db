const { Sequelize } = require('sequelize');

const getFilteredExpenses = (query) => {
  const expenseFilter = {};

  if (query.userId) {
    expenseFilter.userId = Number(query.userId);
  }

  if (query.categories) {
    expenseFilter.category = query.categories;
  }

  if (query.from || query.to) {
    expenseFilter.spentAt = {};

    if (query.from) {
      expenseFilter.spentAt[Sequelize.Op.gte] = new Date(query.from);
    }

    if (query.to) {
      expenseFilter.spentAt[Sequelize.Op.lte] = new Date(query.to);
    }
  }

  return expenseFilter;
};

module.exports = {
  getFilteredExpenses,
};
