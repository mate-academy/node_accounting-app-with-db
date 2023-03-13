'use strict';

let expenses = [];

const setEmptyExpenses = () => {
  expenses = [];
};

const getAll = () => {
  return expenses;
};

const getById = (expenseId) => {
  const neededExpense = expenses.find(expense => expense.id === expenseId);

  return neededExpense || null;
};

const addExpense = (expenseBody) => {
  const id = (expensesArr) => {
    const arrIds = expensesArr.map(element => element.id);

    const newId = Math.max(...arrIds, 0) + 1;

    return newId;
  };

  const newExpense = {
    id,
    ...expenseBody,
  };

  expenses.push(newExpense);

  return newExpense;
};

const updateExpense = (expenseId, expenseBody) => {
  const expenseToUpdate = getById(expenseId);

  Object.assign(expenseToUpdate, expenseBody);

  return expenseToUpdate;
};

const deleteExpense = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== expenseId);
};

const filterExpenses = (expensesArr, filterParams) => {
  let filteredExpenses = expensesArr;

  const {
    userId,
    from,
    to,
    categories,
  } = filterParams;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter(expense => {
      const expenseTime = Date.parse(expense.spentAt);
      const fromTime = Date.parse(from);
      const toTime = Date.parse(to);

      return expenseTime >= fromTime && expenseTime <= toTime;
    });
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.category === categories);
  }

  return filteredExpenses;
};

module.exports = {
  setEmptyExpenses,
  getAll,
  getById: getById,
  addExpense,
  updateExpense,
  deleteExpense,
  filterExpenses,
};
