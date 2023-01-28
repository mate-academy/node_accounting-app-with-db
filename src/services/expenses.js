'use strict';

const { Expense } = require('../models/expenses');

function normalize({ id, userId, spentAt, title, amount, category, note }) {
  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
}

async function getAll(userId, category, from, to) {
  let filteredExpenses = await Expense.findAll({
    order: ['createdAt'],
    logging: false,
  });

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (category) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.category === category);
  }

  if (from) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt >= from);
  }

  if (to) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt <= to);
  }

  return filteredExpenses;
};

function getbyId(expenseId) {
  return Expense.findByPk(Number(expenseId));
}

function create(userId, spentAt, title, amount, category, note) {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

function remove(expenseId) {
  return Expense.destroy({
    where: { id: Number(expenseId) },
  });
};

function update({ id, data }) {
  return Expense.update({ data }, {
    where: { id: Number(id) },
  });
};

module.exports = {
  normalize,
  getAll,
  getbyId,
  create,
  remove,
  update,
};
