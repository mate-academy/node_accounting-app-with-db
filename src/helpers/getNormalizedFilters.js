'use strict';

const { Op } = require('sequelize');

const getNormalizedFilters = ({
  userId,
  categories,
  from,
  to,
}) => {
  const normalizedFilters = {};

  if (userId) {
    normalizedFilters.userId = userId;
  }

  if (categories) {
    normalizedFilters.categories = categories;
  }

  if (to && from) {
    normalizedFilters.spentAt = { [Op.between]: [from, to] };
  } else if (from) {
    normalizedFilters.spentAt = { [Op.gte]: from };
  } else if (to) {
    normalizedFilters.spentAt = { [Op.lte]: to };
  }

  return normalizedFilters;
};

module.exports = {
  getNormalizedFilters,
};
