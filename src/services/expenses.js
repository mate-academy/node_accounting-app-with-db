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

async function getFilteredExpenses(params) {
  const { userId, categories, from, to } = params;

  const expenses = await Expenses.findAll();

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

async function getExpenseById(expenseId) {
  const expense = await Expenses.findByPk(+expenseId);

  return expense;
}

async function createExpense(expense) {
  await Expenses.create(expense);
}

async function deleteExpense(expenseId) {
  await Expenses.destroy({
    where: {
      id: +expenseId,
    },
  });
}

async function updateExpense(expenseId, dataToUpdate) {
  await Expenses.update(dataToUpdate, {
    where: {
      id: +expenseId,
    },
    returning: true,
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
