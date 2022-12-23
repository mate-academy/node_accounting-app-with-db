'use strict';

const { Expense } = require('../models/expenses');

function getAllExpenses() {
  return Expense.findAll({
    order: ['spentAt'],
  });
}

function getExpenseById(id) {
  return Expense.findByPk(id);
}

function createExpense(userId, title, amount, category, note = null) {
  return Expense.create({
    userId,
    title,
    amount,
    category,
    note,
  });
}

function removeExpense(id) {
  return Expense.destroy({
    where: { id },
  });
}

function updateExpense(id, title, amount, category, note = null) {
  return Expense.update({
    title,
    amount,
    category,
    note,
  }, {
    where: { id },
  });
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
