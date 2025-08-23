const expensesData = require('../resources/expenseData');
const { expenses, expenseCount } = expensesData;

const getAllExpenses = async ({ userId, categories, from, to }) => {
  return expenses.filter((expense) => {
    if (userId && expense.userId !== userId) {
      return false;
    }

    if (categories && !categories.includes(expense.category)) {
      return false;
    }

    if (from && new Date(expense.spentAt) < from) {
      return false;
    }

    if (to && new Date(expense.spentAt) > to) {
      return false;
    }

    return true;
  });
};

const getOneExpense = async (id) => {
  return expenses.find((e) => e.id === id) || null;
};

const createExpense = async (expenseItem) => {
  const newItem = {
    id: expenseCount(),
    ...expenseItem,
  };

  expenses.push(newItem);
  expensesData.incrementCount();

  return newItem;
};

const updateExpense = async (id, paramsToUpdate) => {
  const itemToUpdate = expenses.find((e) => e.id === id);

  Object.assign(itemToUpdate, paramsToUpdate);

  return itemToUpdate;
};

const deleteExpense = async (id) => {
  const index = expenses.findIndex((e) => e.id === id);

  if (index === -1) {
    return null;
  }

  const deletedExpense = expenses.splice(index, 1);

  return deletedExpense[0];
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
