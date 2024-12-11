const { getNewExpenseData } = require('../utils/expenses');

const expenseData = {
  spentAt: '2022-10-19T11:01:43.462Z',
  title: 'Buy a new laptop',
  amount: 999,
  category: 'Electronics',
  note: 'I need a new laptop',
};

let expenses = Array.from({ length: 6 }, (_, i) => ({
  ...expenseData,
  userId: 2,
  id: i,
}));

let lastId = expenses.length;

const resetExpenses = () => {
  expenses = [];
  lastId = 0;
};

const getExpenses = (categories, userId, from, to) => {
  let filtredExpenses = [...expenses];

  if (categories) {
    filtredExpenses = filtredExpenses.filter(({ category }) => {
      return categories.includes(category);
    });
  }

  if (!isNaN(+userId)) {
    filtredExpenses = filtredExpenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  if (from) {
    filtredExpenses = filtredExpenses.filter((expense) => {
      return new Date(expense.spentAt) >= new Date(from);
    });
  }

  if (to) {
    filtredExpenses = filtredExpenses.filter((expense) => {
      return new Date(expense.spentAt) <= new Date(to);
    });
  }

  return filtredExpenses;
};

const getExpenseById = (expenseId) =>
  expenses.find(({ id }) => id === expenseId) || null;

const saveExpense = (expense) => {
  lastId += 1;

  const newExpense = getNewExpenseData(expense, lastId);

  expenses.push(newExpense);

  return newExpense;
};

const removeExpense = (expenseId) => {
  expenses = getExpenses().filter(({ id }) => id !== expenseId);
};

const updateExpense = (id, expenseToUpdate) => {
  const expense = getExpenseById(id);

  Object.assign(expense, expenseToUpdate);

  return expense;
};

module.exports = {
  getExpenses,
  getExpenseById,
  saveExpense,
  removeExpense,
  updateExpense,
  resetExpenses,
};
