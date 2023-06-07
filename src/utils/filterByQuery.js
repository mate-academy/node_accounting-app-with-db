'use strict';

const { Op } = require('sequelize');

function filterByQuery(queries) {
  const { userId, categories, from, to } = queries;

  const whereConditions = {};

  if (userId) {
    whereConditions.userId = userId;
  }

  if (categories) {
    whereConditions.category = { [Op.in]: categories };
  }

  if (from && to) {
    whereConditions.spentAt = { [Op.between]: [from, to] };
  } else if (from) {
    whereConditions.spentAt = { [Op.gte]: from };
  } else if (to) {
    whereConditions.spentAt = { [Op.lte]: to };
  }

  return whereConditions;
};

module.exports = {
  filterByQuery,
};
