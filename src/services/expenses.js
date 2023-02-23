'use strict';

const { Expense } = require('../models/Expense');

function normalize({ id, userId, spentAt, title, amount, category, note }) {
  return {
    id, userId, spentAt, title, amount, category, note,
  };
}

async function getAllExpenses(searchParams) {
  const { userId, category, from, to } = searchParams;
  const expenses = await Expense.findAll();

  return expenses.filter(expense => {
    const isUserIdMatch = userId
      ? expense.userId === Number(userId)
      : true;

    const areCategoriesMatch = category
      ? expense.category === category
      : true;

    const isFromMatch = from
      ? expense.spentAt >= from
      : true;

    const isToMatch = to
      ? expense.spentAt <= to
      : true;

    return isUserIdMatch && areCategoriesMatch && isFromMatch && isToMatch;
  });
}

async function getExpenseById(expenseId) {
  const foundExpense = await Expense.findByPk(Number(expenseId));

  return foundExpense;
};

async function createExpense(expenseData) {
  const newExpense = await Expense.create(expenseData);

  return newExpense;
};

function removeExpense(expenseId) {
  return Expense.destroy({
    where: {
      id: Number(expenseId),
    },
  });
};

async function updateExpense(expenseId, expenseData) {
  const expense = Expense.update(expenseData, {
    where: {
      id: Number(expenseId),
    },
  });

  return expense;
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
  normalize,
};
