'use strict';

const { Expense } = require('../models/Expense');
const { Op } = require('sequelize');

const prepareWhere = query => (
  Object.entries(query).reduce((where, [key, value]) => {
    switch (key) {
      case 'from':
        where.spentAt = {
          ...where.spentAt,
          [Op.gt]: value,
        };
        break;

      case 'to':
        where.spentAt = {
          ...where.spentAt,
          [Op.lt]: value,
        };
        break;

      default:
        where[key] = value;
    }

    return where;
  }, {})
);

const getAll = query => {
  const where = prepareWhere(query);

  return Expense.findAll({ where });
};

const getById = id => Expense.findByPk(id);

const add = data => Expense.create(data);

const remove = async(id) => {
  await Expense.destroy({
    where: { id },
  });
};

const update = async(id, data) => {
  const [, [expense]] = await Expense.update(data, {
    where: { id },
    returning: true,
  });

  return expense;
};

module.exports = {
  getAll,
  getById,
  remove,
  add,
  update,
};
