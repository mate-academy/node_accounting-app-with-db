'use strict';

const { Expense } = require('../models/expenses');

function getAllExpenses() {
  return Expense.findAll({
    order: ['created_at'],
  });
};

function addExpense(obj) {
  return Expense.create({
    ...obj,
  });
}

function getExpense(id) {
  return Expense.findByPk(id);
}

function deleteExpense(id) {
  Expense.destroy({
    where: {
      id: id,
    },
  });
}

function updateExpense(id, obj) {
  return Expense.update({
    ...obj,
  }, {
    where: { id }, returning: true,
  });
}

module.exports = {
  getAllExpenses,
  addExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
