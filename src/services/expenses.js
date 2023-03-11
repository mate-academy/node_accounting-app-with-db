'use strict';

const { Expense } = require('../models/Expense.js');
const { Op } = require('sequelize');
const { dateNormalize } = require('../utils/dateNormalize.js');

async function getAll() {
  return Expense.findAll();
}

function getAllByQuery(query) {
  const select = { ...query };
  const hasDateSelect = select.hasOwnProperty('from')
    || select.hasOwnProperty('to');

  if (hasDateSelect) {
    Object.entries(select).forEach(([key, value]) => {
      switch (key) {
        case 'from':
          select.spentAt = {
            ...select.spentAt,
            [Op.gte]: dateNormalize(value),
          };

          delete select.from;
          break;

        case 'to':
          select.spentAt = {
            ...select.spentAt,
            [Op.lte]: dateNormalize(value),
          };

          delete select.to;
          break;

        default:
          break;
      }
    });
  }

  return Expense.findAll({
    where: select,
  });
};

function getById(expensesId) {
  return Expense.findByPk(expensesId);
}

function create(body) {
  return Expense.create(body);
}

async function remove(id) {
  await Expense.destroy({
    where: { id },
  });
}

function update(id, body) {
  return Expense.update(body, {
    where: { id },
  });
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  getAllByQuery,
};
