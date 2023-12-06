'use strict';

let expenses = [];

const resetExpenses = () => {
  expenses = [];
};

const getExpenses = (userId, from, to, categories) => {
  let expensesToDisplay = [...expenses];

  if (userId) {
    expensesToDisplay = expensesToDisplay.filter(e => e.userId === +userId);
  }

  if (categories) {
    expensesToDisplay = expensesToDisplay
      .filter(e => e.category === categories);
  }

  if (from) {
    expensesToDisplay = expensesToDisplay.filter(e => (
      Date.parse(e.spentAt) > Date.parse(from)
    ));
  }

  if (to) {
    expensesToDisplay = expensesToDisplay.filter(e => (
      Date.parse(e.spentAt) < Date.parse(to)
    ));
  }

  return expensesToDisplay;
};

const getById = (id) => {
  return expenses.find(e => e.id === +id) || null;
};

const create = (expenseData) => {
  const newExpense = {
    id: new Date().getTime(),
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
};

const update = (id, dataToUpdate) => {
  const expense = getById(id);

  Object.assign(expense, { ...dataToUpdate });

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter(e => e.id !== +id);
};

module.exports = {
  getExpenses,
  getById,
  create,
  update,
  remove,
  resetExpenses,
};
