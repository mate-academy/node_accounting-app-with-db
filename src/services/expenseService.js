'use strict';

let currentExpenseId = 0;

const createExpense = (expenses, newExpenseData, users) => {
  const {
    userId: newUserId,
    spentAt,
    note,
    title,
    amount,
    category,
  } = newExpenseData;

  const userExists = users.some(u => u.id === newUserId);

  if (!userExists) {
    return null;
  }

  const newExpense = {
    id: ++currentExpenseId,
    userId: newUserId,
    spentAt,
    note,
    title,
    amount,
    category,
  };

  expenses.push(newExpense);

  return newExpense;
};

const getFilteredExpenses = (expenses, filters) => {
  let filteredExpenses = [...expenses];
  const { userId, categories, from, to } = filters;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === parseInt(userId));
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from) {
    const fromDate = new Date(from);

    filteredExpenses = filteredExpenses
      .filter(expense => new Date(expense.spentAt) >= fromDate);
  }

  if (to) {
    const toDate = new Date(to);

    filteredExpenses = filteredExpenses
      .filter(expense => new Date(expense.spentAt) <= toDate);
  }

  return filteredExpenses;
};

const getExpenseById = (expenses, id) => {
  return expenses.find(e => e.id === parseInt(id));
};

const updateExpense = (expenses, expenseId, updateData) => {
  const expense = expenses.find(e => e.id === parseInt(expenseId));

  if (!expense) {
    return null;
  }

  const { spentAt, title, amount, category, note } = updateData;

  if (spentAt) {
    expense.spentAt = spentAt;
  }

  if (title) {
    expense.title = title;
  }

  if (amount) {
    expense.amount = amount;
  }

  if (category) {
    expense.category = category;
  }

  if (note) {
    expense.note = note;
  }

  return expense;
};

const deleteExpense = (expenses, expenseId) => {
  const index = expenses.findIndex(e => e.id === parseInt(expenseId));

  if (index === -1) {
    return false;
  }

  expenses.splice(index, 1);

  return true;
};

module.exports = {
  getFilteredExpenses,
  createExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
