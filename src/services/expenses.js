'use strict';

const { Expense } = require('../models/expense');

function getAll({ userId, category, from, to }) {
  const expenses = Expense.findAll({
    order: ['createdAt'],
  });

  return expenses.length
    ? expenses.filter(expense => {
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
    })
    : [];
}

function findById(expenseId) {
  return Expense.findByPk(expenseId);
}

function create(expenseData) {
  return Expense.create(expenseData);
}

function remove(expenseId) {
  return Expense.destroy({
    where: { id: +expenseId },
  });
}

function update(expenseId) {
  return Expense.update(expenseId, {
    where: { id: +expenseId },
  });
}

module.exports = {
  getAll,
  findById,
  create,
  remove,
  update,
};
