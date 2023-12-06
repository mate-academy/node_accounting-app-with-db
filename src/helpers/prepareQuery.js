'use strict';

const { Op } = require('sequelize');

function prepareQuery(query) {
  const { userId, category, from, to } = query;
  const preparedQuery = {};

  if (userId) {
    preparedQuery.userId = userId;
  }

  if (category) {
    preparedQuery.category = category;
  }

  if (from || to) {
    preparedQuery.spentAt = {
      [Op.between]: [from || -Infinity, to || Infinity],
    };
  }

  return preparedQuery;
}

module.exports = prepareQuery;
