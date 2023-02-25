'use strict';

const Expense = require('../models/expense');

function normalizeExpense({ userId, spentAt, title, amount, category, note }) {
  return {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
}

async function getAll(query) {
  const { userId, category, from, to } = query;

  const expenses = await Expense.findAll({
    order: ['createdAt'],
  });

  return expenses.filter(expense => {
    const isUserFilter = userId
      ? expense.userId === +userId
      : true;
    const isCategoryFilter = category
      ? expense.category === category
      : true;
    const isFromFilter = from
      ? expense.spentAt >= from
      : true;
    const isToFilter = to
      ? expense.spentAt <= to
      : true;

    return isUserFilter && isCategoryFilter && isFromFilter && isToFilter;
  });
};

function getbyId(expenseId) {
  return Expense.findByPk(expenseId);
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
    where: { id: +expenseId },
  });
};

function update({ id, data }) {
  return Expense.update({ data }, {
    where: { id },
  });
};

module.exports = {
  normalizeExpense,
  getAll,
  getbyId,
  create,
  remove,
  update,
};
