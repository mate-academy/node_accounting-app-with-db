const { Sequelize } = require('sequelize');

function getFilteredExpenses(query) {
  const filters = {};

  if (query.userId) {
    filters.userId = Number(query.userId);
  }

  if (query.categories) {
    filters.category = query.categories;
  }

  if (query.from || query.to) {
    filters.spentAt = {};

    if (query.from) {
      filters.spentAt[Sequelize.Op.gte] = query.from;
    }

    if (query.to) {
      filters.spentAt[Sequelize.Op.lte] = query.to;
    }
  }

  return filters;
}

module.exports = {
  getFilteredExpenses,
};
