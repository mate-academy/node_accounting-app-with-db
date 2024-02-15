'use strict';

const { Op } = require('sequelize');
const createWhereObj = (params) => {
  const obj = { where: {} };
  const { userId, categories, from, to } = params;

  if (userId) {
    obj.where.userId = +userId;
  }

  if (categories && categories.length > 0) {
    obj.where.category = categories;
  }

  if (from && to) {
    obj.where.spentAt = {
      [Op.between]: [from, to],
    };
  } else {
    if (from) {
      obj.where.spentAt = {
        [Op.gt]: from,
      };
    }

    if (to) {
      obj.where.spentAt = {
        [Op.lt]: to,
      };
    }
  }

  return obj;
};

module.exports = {
  createWhereObj,
};
