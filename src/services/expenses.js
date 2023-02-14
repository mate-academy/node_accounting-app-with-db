'use strict';

let expenses = [];

const initialExpenses = () => {
  expenses = [];
};

const getAllExpenses = (userId, category, from, to) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === Number(userId));
  }

  if (category) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.category === category);
  }

  if (from) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt > from);
  }

  if (to) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt < to);
  }

  return filteredExpenses;
};

const getExpensesById = (expenseId) => {
  const foundExpense = expenses
    .find(expense => expense.id === Number(expenseId));

  return foundExpense || null;
};

const addExpense = (reqBody) => {
  const { userId, spentAt, title, amount, category, note } = reqBody;

  const maxId = Math.max(...expenses.map(expense => expense.id));

  const newExpense = {
    id: expenses.length ? maxId + 1 : 0,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const deleteExpense = (expenseId) => {
  expenses = expenses
    .filter(expense => expense.id !== Number(expenseId));
};

const updateExpense = (foundExpense, reqBody) => {
  return Object.assign(foundExpense, reqBody);
};

module.exports = {
  initialExpenses,
  getAllExpenses,
  getExpensesById,
  addExpense,
  deleteExpense,
  updateExpense,
};
