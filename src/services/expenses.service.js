'use strict';

let expenses = [];

const getAll = ({ userId, categories, from, to }) => {
  let visibleExpenses = expenses;

  if (userId) {
    visibleExpenses = visibleExpenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  if (categories) {
    visibleExpenses = visibleExpenses.filter(
      (expense) => expense.category === categories,
    );
  }

  if (from) {
    visibleExpenses = visibleExpenses.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from),
    );
  }

  if (to) {
    visibleExpenses = visibleExpenses.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to),
    );
  }

  return visibleExpenses;
};

const getById = (id) => {
  return expenses.find((expense) => expense.id === +id);
};

const create = (data) => {
  const newExpense = { id: expenses.length + 1, ...data };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== +id);
};

const update = (id, data) => {
  const updateExpenseId = expenses.find((expense) => expense.id === +id);

  Object.assign(updateExpenseId, data);

  return updateExpenseId;
};

const reset = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  reset,
};
