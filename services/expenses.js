/* eslint-disable space-before-function-paren */
'use strict';

const { Expense } = require('../models');

const getAll = async ({ userId, categories, from, to }) => {
  let result = await Expense.findAll();

  if (userId) {
    result = result.filter(expense => expense.userId === +userId);
  }

  if (categories && categories.length > 0) {
    result = result.filter(({ category }) => categories.includes(category));
  }

  if (from) {
    result = result.filter(({ spentAt }) => {
      return Date.parse(spentAt) >= Date.parse(from);
    });
  }

  if (to) {
    result = result.filter(({ spentAt }) => {
      return Date.parse(spentAt) <= Date.parse(to);
    });
  }

  return result;
};

const getExpenseById = (expenseId) => {
  return Expense.findByPk({ id: expenseId });
};

const createEpxense = async (data) => {
  const newExpense = await Expense.create(data);

  return newExpense;
};

const removeExpense = async (expenseId) => {
  await Expense.destroy({ where: { id: expenseId } });
};

const updateExpense = async (expenseId, data) => {
  await Expense.update({
    ...data,
  }, {
    where: {
      id: expenseId,
    },
  });
};

module.exports = {
  getAll,
  getExpenseById,
  createEpxense,
  removeExpense,
  updateExpense,
};
