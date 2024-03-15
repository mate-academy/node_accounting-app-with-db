'use strict';

const expenses = [];

const createExpenseService = (expense) => {
  const newExpense = Object.assign(expense, { id: expenses.length + 1 });

  expenses.push(newExpense);

  return newExpense;
};

const findExpenseService = (id) => {
  return expenses.find((expense) => expense.id === +id) || null;
};

const updateExpenseService = (expenseIndex, title) => {
  expenses[expenseIndex].title = title;

  return expenses[expenseIndex];
};

const deleteExpenseService = (expenseIndex) => {
  expenses.splice(expenseIndex, 1);
};

module.exports = {
  createExpenseService,
  findExpenseService,
  updateExpenseService,
  deleteExpenseService,
  expenses,
};
