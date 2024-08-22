const generateNextId = require('../utils/generateNextId');

let expenses = [];

const init = () => {
  expenses = [];
};

const getAllExpenses = ({ userId, categories, from, to }) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === categories,
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from),
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to),
    );
  }

  return filteredExpenses;
};

const createExpense = (data) => {
  const expense = {
    id: generateNextId(expenses),
    ...data,
  };

  expenses.push(expense);

  return expense;
};

const getExpenseById = (id) => {
  return expenses.find((expense) => expense.id === +id);
};

const deleteExpense = (id) => {
  expenses = expenses.filter((expense) => expense.id !== +id);
};

const updateExpense = (id, data) => {
  const expense = getExpenseById(id);

  Object.assign(expense, data);

  return expense;
};

module.exports = {
  init,
  getAllExpenses,
  createExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
};
