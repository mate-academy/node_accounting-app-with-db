'use strict';

const { Expense } = require('../models/Expense.js');

async function getAll({ userId, categories, from, to }) {
  const expenses = await Expense.findAll({
    order: [ 'createdAt' ],
  });

  const filteredExpenses = expenses.filter(expense => {
    const byUserId = userId
      ? expense.userId === +userId
      : true;

    const byCategories = categories
      ? categories.includes(expense.category)
      : true;

    const byFrom = from
      ? expense.spentAt > from
      : true;

    const byTo = to
      ? expense.spentAt < to
      : true;

    return byUserId && byCategories && byFrom && byTo;
  });

  return filteredExpenses;
}

function getById(expenseId) {
  return Expense.findByPk(+expenseId);
}

function create(expense) {
  return Expense.create(expense);
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
  getAll,
  getById,
  create,
  remove,
  update,
};
