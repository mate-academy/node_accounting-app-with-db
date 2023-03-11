'use strict';

const { Expense } = require('../models/Expense.js');
const { Op } = require('sequelize');

async function getAll() {
  return Expense.findAll();
}

function getAllByQuery(query) {
  const select = { ...query };

  if (select.hasOwnProperty('from')) {
    select.spentAt = {
      [Op.gte]: select.from,
    };
    delete select.from;
  }

  if (select.hasOwnProperty('to')) {
    select.spentAt = {
      ...select.spentAt,
      [Op.lte]: select.to,
    };
    delete select.to;
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
