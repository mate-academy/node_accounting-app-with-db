'use strict';

const { Expense } = require('../models/expenses');

async function getAllExpenses() {
  const result = await Expense.findAll();

  return result;
  ;
};

function getExpenseByID(expenseId) {
  return Expense.findByPk(expenseId);
};

async function createExpense(userId, spentAt, title, amount, category, note) {
  const newExp = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  const createdExp = await Expense.create(newExp);

  return createdExp;
};

function deleteExpense(expenseId) {
  return Expense.destroy({
    where: { id: expenseId },
  });
};

function updatedExpense({
  expenseId,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  return Expense.update({
    spentAt,
    title,
    amount,
    category,
    note,
  }, {
    where: { id: expenseId },
  });
};

module.exports = {
  getAllExpenses,
  getExpenseByID,
  createExpense,
  deleteExpense,
  updatedExpense,
};
