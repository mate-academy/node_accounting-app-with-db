'use strict';

let expenses = [];

const getAllExpenses = ({ userId, categories, from, to }) => {
  const newExpenses = expenses.filter((item) => {
    if (
      (!userId || item.userId === +userId)
        && (!categories || item.category === categories)
        && (!from || !to || (
          Date.parse(item.spentAt) < Date.parse(to)
            && Date.parse(item.spentAt) > Date.parse(from)
        ))
    ) {
      return true;
    }

    return false;
  });

  return newExpenses;
};

const createExpense = (payload) => {
  const expense = {
    id: +new Date(),
    ...payload,
  };

  expenses.push(expense);

  return expense;
};

const getExpense = (id) => {
  return expenses.find(expense => expense.id === +id) || null;
};

const deleteExpense = (id) => {
  expenses = expenses.filter(expense => expense.id !== +id);
};

const updateExpense = ({ expense, payload }) => {
  Object.assign(expense, payload);
};

module.exports = {
  getAllExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
