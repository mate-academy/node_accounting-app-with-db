let expenses = [];
const getId = require('../utils/createMaxId');
const { getFilteredExpenses } = require('../utils/getFilteredExpenses');

const initExpenses = () => {
  expenses = [];
};

const getAllExpenses = (query) => {
  expenses = getFilteredExpenses(expenses, query);

  return expenses;
};

const getExpenseById = (id) => {
  return expenses.find((expense) => expense.id === Number(id) || null);
};

const createExpence = (body) => {
  const expense = {
    id: getId.createMaxId(expenses),
    ...body,
  };

  expenses.push(expense);

  return expense;
};

const deleteExpense = (id) => {
  expenses = expenses.filter((expense) => expense.id !== Number(id));
};

const updateExpence = (id, body) => {
  const expense = getExpenseById(id);

  Object.assign(expense, {
    ...body,
  });

  return expense;
};

module.exports = {
  initExpenses,
  getAllExpenses,
  getExpenseById,
  createExpence,
  deleteExpense,
  updateExpence,
};
