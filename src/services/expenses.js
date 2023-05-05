'use strict';

const { idGenerator } = require('../tools/idGenerator');

let expenses = [];

const getNextId = idGenerator(expenses);

function reset() {
  expenses = [];
}

function getAll(options) {
  const {
    userId,
    categories,
    from,
    to,
  } = options;

  const filteredExpenses = expenses.filter(expense => {
    if (userId && expense.userId !== Number(userId)) {
      return false;
    }

    if (categories && expense.category !== categories) {
      return false;
    }

    if (from && to) {
      const spentAt = new Date(expense.spentAt).getTime();
      const fromDate = new Date(from).getTime();
      const toDate = new Date(to).getTime();

      return (spentAt >= fromDate) && (spentAt <= toDate);
    }

    return true;
  });

  return filteredExpenses;
}

function getById(id) {
  const foundExpense = expenses.find(expense => expense.id === id);

  return foundExpense || null;
}

function getByUserId(userId) {
  const filteredExpenses
    = expenses.filter(expense => expense.userId === userId);

  return filteredExpenses;
}

function create(userId, spentAt, title, amount, category, note) {
  const newExpense = {
    id: getNextId(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
}

function remove(id) {
  expenses = expenses.filter(expense => expense.id !== id);
}

function update({ id, ...expenseData }) {
  const expense = getById(id);

  Object.assign(expense, expenseData);
}

module.exports = {
  reset,
  getAll,
  getById,
  getByUserId,
  create,
  remove,
  update,
};
