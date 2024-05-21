const { Op } = require('sequelize');

const getFilteredExpenses = ({ userId, categories, from, to }) => {
  const queryFilters = {};

  if (userId) {
    queryFilters.userId = userId;
  }

  if (categories) {
    queryFilters.category = categories;
  }

  // if (from && to) {
  //   queryFilters.spentAt = {
  //     [Op.between]: [from, to],
  //   };
  // }

  if (from || to) {
    queryFilters.spentAt = {};

    if (from) {
      queryFilters.spentAt[Op.gte] = from;
    }

    if (to) {
      queryFilters.spentAt[Op.lte] = to;
    }
  }

  return queryFilters;
};

module.exports = getFilteredExpenses;
