'use strict';

const { Expense } = require('../models/Expense');

async function getAll() {
  const result = await Expense.findAll({
    order: ['spentAt'],
  });

  return result;
};

function getById(expenseId) {
  return Expense.findByPk(Number(expenseId));
};

function create(data) {
  return Expense.create({
    ...data,
  });
};

function remove(expenseId) {
  return Expense.destroy({
    where: { id: expenseId },
  });
};

function update(expenseId, data) {
  return Expense.update({ ...data }, {
    where: {
      id: expenseId,
    },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
