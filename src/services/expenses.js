'use strict';

const { findMaxId } = require('../utils');

let initialExpenses = [];

const getAllByQuery = ({
  category: queryCategory,
  userId: queryUserId,
  from,
  to,
}) => {
  return initialExpenses.filter(({
    userId,
    spentAt,
    category,
  }) => {
    const isRequestedUser = queryUserId
      ? +queryUserId === userId
      : true;

    const isRequestedCategory = queryCategory
      ? queryCategory.toLowerCase() === category.toLowerCase()
      : true;

    const isDateFromQuery = from
      ? new Date(from) <= new Date(spentAt)
      : true;

    const isDateToQuery = to
      ? new Date(to) >= new Date(spentAt)
      : true;

    return (isRequestedUser && isRequestedCategory
      && isDateFromQuery && isDateToQuery);
  });
};

const getExpenseById = (expenseId) => initialExpenses.find(({ id }) => (
  expenseId === id
));

const createExpense = (expenseData) => {
  const newExpense = {
    ...expenseData,
    id: findMaxId(initialExpenses) + 1,
  };

  initialExpenses.push(newExpense);

  return newExpense;
};

const updateExpense = (id, expenseData) => {
  const expense = getExpenseById(id);
  const expenseDataEntries = Object.entries(expenseData);

  expenseDataEntries.forEach(([key, value]) => {
    if (expense.hasOwnProperty(key)) {
      expense[key] = value;
    }
  });

  return expense;
};

const removeExpense = (expenseId) => {
  initialExpenses = initialExpenses.filter(({ id }) => id !== expenseId);
};

const resetExpenses = () => {
  initialExpenses = [];
};

module.exports = {
  getAllByQuery,
  getExpenseById,
  createExpense,
  updateExpense,
  removeExpense,
  resetExpenses,
};
