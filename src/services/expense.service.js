const { existUser } = require('./user.service');
let expenses = [];
let nextId = 0;

const getAllExpense = () => {
  return expenses;
};

const getExpenseById = (expenseId) => {
  return expenses.find((e) => e.id === Number(expenseId));
};

const filterQuery = ({ from, to, userId, categories }) => {
  return expenses.filter((e) => {
    const userIdMatch = !userId || e.userId === Number(userId);
    const fromMatch = !from || new Date(e.spentAt) >= new Date(from);
    const toMatch = !to || new Date(e.spentAt) <= new Date(to);
    const categoryMatch = !categories || categories.includes(e.category);

    return userIdMatch && fromMatch && toMatch && categoryMatch;
  });
};

const addExpense = ({ userId, spentAt, title, amount, category, note }) => {
  if (!existUser(userId)) {
    return null;
  }

  const newExpense = {
    id: nextId++,
    spentAt: new Date(spentAt),
    userId: Number(userId),
    title,
    amount: Number(amount),
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const deleteExpense = (expenseId) => {
  const expenseToDelete = getExpenseById(expenseId);

  if (!expenseToDelete) {
    return;
  }

  expenses = expenses.filter((e) => e.id !== expenseToDelete.id);
};

const updateExpense = ({
  expenseId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const expenseToUpdate = getExpenseById(expenseId);

  if (!expenseToUpdate) {
    return null;
  }

  Object.assign(expenseToUpdate, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return expenseToUpdate;
};

const reset = () => {
  expenses = [];
};

module.exports = {
  getAllExpense,
  getExpenseById,
  addExpense,
  deleteExpense,
  updateExpense,
  reset,
  filterQuery,
};
