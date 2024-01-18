'use strict';

const { Op } = require('sequelize');

const filterExpense = (userId, categories, from, to) => {
  const clauses = {};

  if (userId) {
    clauses.userId = userId;
  }

  if (categories) {
    clauses.category = { [Op.in]: categories };
  }

  if (from && to) {
    clauses.spentAt = {
      [Op.between]: [new Date(from), new Date(to)],
    };
  }

  return clauses;
};

module.exports = {
  filterExpense,
};
