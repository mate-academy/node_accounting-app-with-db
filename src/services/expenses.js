'use strict';

const Expenses = require('../db/models/expenses');

function normalizeExpense({
  userId,
  title,
  category,
  amount,
  spentAt,
  note,
}) {
  return {
    userId,
    title,
    category,
    amount,
    spentAt,
    note,
  };
}

function getFilteredExpenses(params) {
  const { userId, categories, from, to } = params;

  const expenses = Expenses.findAll();

  return expenses.filter(expense => {
    const isUserIdMatch = userId
      ? expense.userId === +userId
      : true;

    const isCategoryMatch = categories
      ? categories.includes(expense.category)
      : true;

    const isFromMath = from
      ? expense.spentAt >= from
      : true;

    const isToMatch = to
      ? expense.spentAt <= to
      : true;

    return isUserIdMatch && isCategoryMatch && isFromMath && isToMatch;
  });
}

function getExpenseById(expenseId) {
  return Expenses.findByPk(+expenseId);
}

function createExpense(expense) {
  return Expenses.create(expense);
}

function deleteExpense(expenseId) {
  return Expenses.destroy({
    where: {
      id: +expenseId,
    },
  });
}

function updateExpense(expenseId, dataToUpdate) {
  return Expenses.destroy(dataToUpdate, {
    where: {
      id: +expenseId,
    },
  });
}

module.exports = {
  normalizeExpense,
  getExpenseById,
  getFilteredExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
};
