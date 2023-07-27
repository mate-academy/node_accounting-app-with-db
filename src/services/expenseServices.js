'use strict';

let expenses = [];

const init = () => {
  expenses = [];
};

const { getUserById } = require('../services/userServices');

const validateData = (request) => {
  const requiredFields = [
    'userId',
    'spentAt',
    'title',
    'amount',
    'category',
  ];

  const requestFields = Object.keys(request);

  const hasRequiredFields = requiredFields.every((field) => (
    requestFields.includes(field)
  ));

  const user = getUserById(request.userId);

  if (!user || !hasRequiredFields || !requiredFields.length) {
    return false;
  }

  const {
    userId,
    spentAt,
    title,
    amount,
    category,
  } = request;

  if (
    typeof userId !== 'number'
    || typeof amount !== 'number'
    || typeof title !== 'string'
    || typeof category !== 'string'
    || isNaN(Date.parse(spentAt))
  ) {
    return false;
  }

  return true;
};

const getAllExpenses = ({
  userId,
  categories,
  from,
  to,
}) => {
  expenses = expenses.filter(expense => {
    const userIdMatch = userId
      ? +expense.userId === Number(userId)
      : true;

    const categoryMatch = categories
      ? categories.includes(expense.category)
      : true;

    const datesMatch = (from && to)
      ? expense.spentAt >= from && expense.spentAt <= to
      : true;

    return userIdMatch && categoryMatch && datesMatch;
  });

  return expenses;
};

const create = ({ userId,
  spentAt,
  title,
  amount,
  category,
  note }) => {
  const maxId = expenses.length > 0
    ? Math.max(...expenses.map(({ id }) => id))
    : 0;

  const newExpense = {
    id: maxId + 1,
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

const getExpenseById = (expenseId) => {
  return expenses.find(({ id }) => id === Number(expenseId)) || null;
};

const removeExpense = (expenseId) => (
  expenses = expenses.filter(({ id }) => Number(id) !== +expenseId
  )
);

const updateExpense = (expenseId, newData) => {
  const expenseToUpdate = getExpenseById(Number(expenseId));

  Object.assign(expenseToUpdate, newData);

  return expenseToUpdate;
};

module.exports = {
  init,
  validateData,
  getAllExpenses,
  create,
  getExpenseById,
  removeExpense,
  updateExpense,
};
