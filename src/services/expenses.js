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
};

async function getAll({
  userId,
  category,
  from,
  to,
}) {
  const expenses = await Expense.findAll({
    order: ['createdAt'],
  });

  return expenses.filter(expense => {
    const isUserIdMatch = userId
      ? expense.userId === +userId
      : true;

    const isCategoryMatch = category
      ? expense.category === category
      : true;

    const isFromMatch = from
      ? expense.spentAt >= from
      : true;

    const isToMatch = to
      ? expense.spentAt <= to
      : true;

    return isUserIdMatch && isCategoryMatch && isFromMatch && isToMatch;
  });
};

function getById(expenseId) {
  return Expense.findByPk(+expenseId);
};

function create(expenseData) {
  return Expense.create(expenseData);
};

function remove(expenseId) {
  return Expense.destroy({
    where: { id: +expenseId },
  });
};

function update(expenseId, expenseData) {
  return Expense.update(expenseData, {
    where: { id: +expenseId },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  normalize,
};
