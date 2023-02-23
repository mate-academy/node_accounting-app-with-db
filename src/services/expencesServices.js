'use strict';

const { Expenses } = require('../models/Expenses');

function normalize({
  userId,
  spendAt,
  title,
  amount,
  category,
  note,
}) {
  return {
    userId,
    spendAt,
    title,
    amount,
    category,
    note,
  };
}

async function getAll(query) {
  const { userId, category, from, to } = query;

  const expenses = await Expenses.findAll({
    order: ['createdAt'],
  });

  return expenses.filter((expense) => {
    const userIdMatches = !userId || expense.userId === Number(userId);
    const categoryMatches = !category || category.includes(expense.category);
    const fromMatches = !from || expense.spentAt >= from;
    const toMatches = !to || expense.spentAt <= to;

    return userIdMatches && categoryMatches && fromMatches && toMatches;
  });
}

function findById(expenseId) {
  return Expenses.findByPk(expenseId);
}

function create(expenseData) {
  return Expenses.create(expenseData);
}

function remove(expenseId) {
  return Expenses.destroy({
    where: { id: +expenseId },
  });
}

function update(expenseId, expenseData) {
  return Expenses.update(expenseId, {
    where: { id: +expenseId },
  });
}

module.exports = {
  normalize,
  getAll,
  findById,
  create,
  remove,
  update,
};
