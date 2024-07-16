const { getHighestId } = require('../helpers/getHighestId');

let expenses = [];

const getAllExpenses = () => expenses;

const getExpensesByFilter = (filter) => {
  return expenses.filter(filter);
};

const getExpenseById = (expenseId) => {
  return expenses.find((expense) => expense.id === +expenseId);
};

const createExpense = (requestBody) => {
  const newId = getHighestId(expenses) + 1;

  const newExpense = { ...requestBody, id: newId };

  expenses.push(newExpense);

  return newExpense;
};

const deleteExpenseById = (expenseId) => {
  const searchedExpenseIndex = getExpenseIndexById(expenseId);

  expenses.splice(searchedExpenseIndex, 1);
};

const updateExpense = (expenseToUpdate, newExpenseData) => {
  Object.assign(expenseToUpdate, newExpenseData);
};

module.exports = {
  resetExpenses,
  expenses,
  getAllExpenses,
  createExpense,
  getExpensesByFilter,
  getExpenseById,
  deleteExpenseById,
  updateExpense,
};

function resetExpenses() {
  expenses = [];
}

function getExpenseIndexById(expenseId) {
  return expenses.findIndex((expense) => expense.id === expenseId);
}
