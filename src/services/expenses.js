'use strict';

const { Expense } = require('../models/Expense');

function getAll() {
  return Expense.findAll({
    order: ['spentAt'],
  });
};

function getById(expenseId) {
  return Expense.findByPk(expenseId);
}

function addOne(newExpanse) {
  return Expense.create({ ...newExpanse });
}

function deleteOne(id) {
  return Expense.destroy({
    where: { id },
  });
}

function updateOne(id, newData) {
  return Expense.update({ ...newData }, {
    where: { id },
  });
}

module.exports = {
  getAll,
  getById,
  addOne,
  deleteOne,
  updateOne,
};
