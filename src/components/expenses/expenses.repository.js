'use strict';

const { Expense } = require('../models/expenses.module');

async function create(data) {
  return Expense.create(data);
}

function findAll() {
  return Expense.findAll();
}

function findOne(id) {
  return Expense.findOne({ where: { id } });
}

function update(id, data) {
  return Expense.update(data, { where: { id } });
}

function remove(id) {
  return Expense.destroy({ where: { id } });
}

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
};
