'use strict';

const { Expense } = require('../models/expense.js');
const { filterExpenses } = require('../helpers/helpers.js');

function getAll(queryParams) {
  const conditions = filterExpenses(queryParams);

  return Expense.findAll({
    where: conditions,
  });
}

function getById(expenseId) {
  return Expense.findByPk(expenseId);
}

function create(data) {
  return Expense.create({ ...data });
}

function remove(expenseId) {
  return Expense.destroy({
    where: { expenseId },
  });
}

function update({ id, body }) {
  return Expense.update({ ...body }, {
    where: { id },
  });
}

module.exports = {
  getAll,
  getById,
  remove,
  update,
  create,
};
