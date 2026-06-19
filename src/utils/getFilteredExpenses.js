const { Sequelize } = require('sequelize');

const getFilteredExpenses = ({ userId, categories, from, to }) => {
  const filterParams = {};

  if (userId) {
    filterParams.userId = userId;
  }

  if (categories) {
    filterParams.category = categories;
  }

  if (from || to) {
    filterParams.spentAt = {};

    if (from) {
      filterParams.spentAt[Sequelize.Op.gte] = from;
    }

    if (to) {
      filterParams.spentAt[Sequelize.Op.lte] = to;
    }
  }

  return filterParams;
};

module.exports = {
  getFilteredExpenses,
};
