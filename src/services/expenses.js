'use strict';

const { Expense } = require('../models/Expense');

function normalize({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
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

async function getAll(params) {
  const { userId, category, from, to } = params;

  const expenses = await Expense.findAll({
    order: ['createdAt'],
  });

  return expenses.filter(expense => {
    const isUserIdMatch = userId
      ? expense.userId === +userId
      : true;

    const isCategoriesMatch = category
      ? expense.category === category
      : true;

    const isFromMatch = from
      ? expense.spentAt >= from
      : true;

    const isToMatch = to
      ? expense.spentAt <= to
      : true;

    return isUserIdMatch && isCategoriesMatch && isFromMatch && isToMatch;
  });
};

function findById(expenseId) {
  return Expense.findByPk(Number(expenseId));
}

function create(data) {
  return Expense.create(data);
}

function update(expenseId, dataToUpdate) {
  return Expense.update(dataToUpdate, {
    where: { id: Number(expenseId) },
  });
}

function remove(expenseId) {
  Expense.destroy({
    where: { id: Number(expenseId) },
  });
}

module.exports = {
  normalize,
  getAll,
  findById,
  create,
  update,
  remove,
};
