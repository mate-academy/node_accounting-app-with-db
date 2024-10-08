'use strict';

const createId = require('../utils/createId');

const expenses = [];

function init() {
  expenses.length = 0;
}

const get = (params) => {
  let filteredExpenses = expenses;

  const { userId, categories, from, to } = params;

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

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    filteredExpenses = filteredExpenses.filter(
      (expense) =>
        fromDate <= new Date(expense.spentAt) &&
        new Date(expense.spentAt) <= toDate,
    );
  }

  return filteredExpenses;
};

function create(data) {
  const expense = {
    id: createId(expenses),
    ...data,
  };

  expenses.push(expense);

  return expense;
}

function getById(id) {
  return expenses.find((expense) => expense.id === id);
}

function remove(id) {
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index > -1) {
    expenses.splice(index, 1);
  }
}

function update(expense, data) {
  return Object.assign(expense, data);
}

module.exports = {
  init,
  get,
  create,
  getById,
  remove,
  update,
};
