'use strict';

const expenses = [];

const getExpenses = () => expenses;

const getUserById = (expenceId) => expenses.find(e => e.id === +expenceId);

const addNewExpense = (newExpense) => expenses.push(newExpense);

const expenseIndex = (id) => expenses.findIndex(e => e.id === +id);

const updateExpenseValues = (index, spentAt, title, amount, category, note) => (
  expenses[index] = {
    ...expenses[index],
    spentAt: spentAt || expenses[index].spentAt,
    title: title || expenses[index].title,
    amount: amount || expenses[index].amount,
    category: category || expenses[index].category,
    note: note || expenses[index].note,
  }
);

const deleteOneExpense = (index) => expenses.splice(index, 1);

const clearExpenses = () => expenses.splice(0);

const expensesService = {
  getExpenses,
  getUserById,
  addNewExpense,
  expenseIndex,
  updateExpenseValues,
  deleteOneExpense,
  clearExpenses,
};

module.exports = {
  expensesService,
};
