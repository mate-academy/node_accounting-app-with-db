'use strict';

let expenses = [];

function getAll({
  userId,
  categories,
  from,
  to,
}) {
  if (userId) {
    expenses = expenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  if (categories) {
    expenses = expenses.filter(
      (expense) => categories.includes(expense.category),
    );
  }

  if (from) {
    expenses = expenses.filter(
      (expense) => expense.spentAt >= from,
    );
  }

  if (to) {
    expenses = expenses.filter(
      (expense) => expense.spentAt <= to,
    );
  }

  return expenses;
}

function getExpenseById(expenseId) {
  const foundExpense = expenses.find(({ id }) => id === +expenseId);

  return foundExpense || null;
}

function createExpense({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  const newExpense = {
    id: +Date.now(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
}

function removeExpense(expenseId) {
  expenses = expenses.filter(
    expense => expense.id !== +expenseId,
  );
}

function updateExpense(expenseId, params) {
  const currentExpense = getExpenseById(expenseId);

  const validKeys = Object.keys(currentExpense);

  for (const [key, value] of Object.entries(params)) {
    if (
      validKeys.includes(key)
      && typeof value === typeof currentExpense[key]
    ) {
      Object.assign(currentExpense, { [key]: value });
    }
  }

  return currentExpense;
}

function removeAllExpenses() {
  expenses = [];
}

module.exports = {
  getAll,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
  removeAllExpenses,
};
