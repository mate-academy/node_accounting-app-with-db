'use strict';

let expenses = [];
let expId = 1;

const generateExpId = () => {
  const newId = expId;

  expId++;

  return newId;
};

const getAll = () => {
  return expenses;
};

const getFiltered = (userId, categories, fromDate, toDate) => {
  let filterData = [...expenses];

  if (userId) {
    filterData = filterData.filter(ex => ex.userId === Number(userId));
  }

  if (categories) {
    filterData = filterData.filter(ex => categories.includes(ex.category));
  }

  if (fromDate) {
    const dateFrom = new Date(fromDate);

    filterData = filterData.filter(ex => new Date(ex.spentAt) >= dateFrom);
  }

  if (toDate) {
    const dateTo = new Date(toDate);

    filterData = filterData.filter(ex => new Date(ex.spentAt) <= dateTo);
  }

  return filterData;
};

const getById = (id) => {
  return expenses.find(ex => ex.id === Number(id)) || null;
};

const create = (userId, spentAt, title, amount, category, note) => {
  const newExpense = {
    id: generateExpId(),
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

const update = (id, updates) => {
  const expense = getById(id);

  Object.assign(expense, updates);

  return expense;
};

const remove = (id) => {
  const newExpenses = expenses.filter(ex => ex.id !== id);

  expenses = newExpenses;
};

const reset = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getFiltered,
  getById,
  create,
  update,
  remove,
  reset,
};
