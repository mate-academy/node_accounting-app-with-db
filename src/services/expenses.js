'use strict';

const { Expense } = require('../models/expenses');

async function getAll(userId, category, from, to) {
  let filteredExpenses = await Expense.findAll();

  if (category) {
    filteredExpenses = filteredExpenses.filter(expense =>
      (expense.category === category));
  }

  if (userId) {
    filteredExpenses = filteredExpenses.filter(expense =>
      (expense.userId === +userId));

    return filteredExpenses;
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(expense => {
      const n = new Date(from);

      return expense.spentAt.getTime() >= n.getTime();
    });
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(expense => {
      const n = new Date(to);

      return expense.spentAt.getTime() <= n.getTime();
    });
  }

  return filteredExpenses;
}

function getById(expenseId) {
  return Expense.findByPk(Number(expenseId));
}

function create(expenseDetails) {
  return Expense.create({ ...expenseDetails });
}

function remove(expenseId) {
  return Expense.destroy({
    where: { id: Number(expenseId) },
  });
}

function update({ title, id }) {
  return Expense.update({ title }, {
    where: { id },
    returning: true,
    plain: true,
  });
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
