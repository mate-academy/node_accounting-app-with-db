'use strict';

const Expense = require('../models/expense');

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

  if (!hasRequiredFields || !requiredFields.length) {
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

const getAllExpenses = async({
  userId,
  categories,
  from,
  to,
}) => {
  const expenses = await Expense.findAll({ order: ['spentAt'] });

  const filteredExpenses = expenses.filter(expense => {
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

  return filteredExpenses;
};

const create = async(expenseData) => {
  const newExpense = await Expense.create({ ...expenseData });

  return newExpense;
};

const getExpenseById = async(expenseId) => {
  const expense = await Expense.findByPk(expenseId);

  return expense;
};

const removeExpense = async(expenseId) => {
  await Expense.destroy({ where: { id: expenseId } });
};

const updateExpense = async(expenseId, newData) => {
  const expenseToUpdate = await Expense
    .update(newData, { where: { id: expenseId } });

  return expenseToUpdate;
};

module.exports = {
  validateData,
  getAllExpenses,
  create,
  getExpenseById,
  removeExpense,
  updateExpense,
};
