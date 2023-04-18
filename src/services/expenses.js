'use strict';

const { Expense } = require('../models/Expense.js');

let expenses = [];

function getInitialValue() {
  expenses = [];

  return expenses;
}

async function getAll({ userId, categories, from, to }) {
  expenses = await Expense.findAll({
    order: [ 'createdAt' ],
  });

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (categories) {
    expenses = expenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from) {
    expenses = expenses.filter(expense => expense.spentAt > from);
  }

  if (to) {
    expenses = expenses.filter(expense => expense.spentAt < to);
  }

  return expenses;
}

function getById(expenseId) {
  return Expense.findByPk(+expenseId);
}

function create({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  const maxId = Math.max(expenses.map(expense => expense.id), 0);

  const newExpense = {
    id: maxId + 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  return Expense.create(newExpense);
}

function remove(expenseId) {
  Expense.destroy({
    where: { id: +expenseId },
  });
}

function update({ expenseId, data }) {
  return Expense.update({ data }, {
    where: { id: +expenseId },
  });
}

module.exports = {
  getInitialValue,
  getAll,
  getById,
  create,
  remove,
  update,
};
