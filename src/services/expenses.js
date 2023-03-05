'use strict';

const { Expense } = require('../models/Expense');
const { Op } = require('sequelize');

const getWhereFromQuery = query => {
  const where = {};

  Object.entries(query).forEach(([key, value]) => {
    switch (key) {
      case 'from':
        where.spentAt = {
          [Op.gt]: value,
        };
        break;

      case 'to':
        where.spentAt = {
          [Op.lt]: value,
        };
        break;

      default:
        where[key] = value;
    }
  });

  return where;
};

const getAll = (query) => {
  const where = getWhereFromQuery(query);

  return Expense.findAll({ where });
};

const getById = id => Expense.findByPk(id);

const add = (data) => {
  return Expense.create(data);
};

const remove = async(id) => {
  await Expense.destroy({
    where: { id },
  });
};

const update = async(id, data) => {
  await Expense.update(data, {
    where: { id },
  });
};

module.exports = {
  getAll,
  getById,
  remove,
  add,
  update,
};
