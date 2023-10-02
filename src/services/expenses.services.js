'use strict';

let expenses = [];

const getAllExpenses = () => {
  return expenses;
};

const getByIdExpense = (id) => {
  return expenses.find(exp => exp.id === +id);
};

const getByQueryExpenses = (query) => {
  const {
    from,
    to,
    userId,
    categories,
  } = query;

  let newExpenses = [...expenses];

  if (userId) {
    newExpenses = newExpenses.filter(el => +el.userId === +userId);
  };

  if (from) {
    const dateFrom = new Date(from).valueOf();

    newExpenses = newExpenses
      .filter(el => new Date(el.spentAt).valueOf() > dateFrom);
  };

  if (to) {
    const dateTo = new Date(to).valueOf();

    newExpenses = newExpenses
      .filter(el => new Date(el.spentAt).valueOf() < dateTo);
  };

  if (categories) {
    newExpenses = newExpenses.filter(el => el.category === categories);
  };

  return newExpenses;
};

const createExpense = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const expense = {
    id: 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const updateExpense = (id, paramToUpdate) => {
  const expense = getByIdExpense(id);

  const keys = Object.keys(paramToUpdate);

  for (const key of keys) {
    if (expense.hasOwnProperty(key)) {
      expense[key] = paramToUpdate[key];
    }
  }

  return expense;
};

const deleteExpense = (id) => {
  const expenseToDelete = getByIdExpense(id);

  if (!expenseToDelete) {
    return;
  }

  expenses = expenses.filter(exp => exp.id !== expenseToDelete.id);
};

const clear = () => {
  expenses.length = 0;
};

module.exports = {
  getAllExpenses,
  getByIdExpense,
  getByQueryExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  clear,
};
