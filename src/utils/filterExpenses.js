'use strict';

const { Op } = require('sequelize');

const filterExpenses = (queryParams) => {
  const { userId, categories, from, to } = queryParams;

  const conditions = {};

  if (userId) {
    conditions.userId = userId;
  }

  if (categories) {
    conditions.category = { [Op.in]: categories };
  }

  if (from && to) {
    conditions.spentAt = { [Op.between]: [from, to] };
  } else if (from) {
    conditions.spentAt = { [Op.gte]: from };
  } else if (to) {
    conditions.spentAt = { [Op.lte]: to };
  }

  return conditions;
};

module.exports = {
  filterExpenses,
};
