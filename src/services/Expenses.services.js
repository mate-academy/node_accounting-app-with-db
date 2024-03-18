/* eslint-disable prettier/prettier */
/* eslint-disable function-paren-newline */
const { Expense } = require('../models/Expense.model');

const postExpenses = async (expenseData) => {
  const newExpense = await Expense.create({
    ...expenseData,
  });

  return newExpense;
};

const getAllExpenses = async (userId, categories, from, to) => {
  let filteredExpenses = await Expense.findAll();

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter((expense) =>
      categories.includes(expense.category),
    );
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter(
      (expense) =>
        new Date(expense.spentAt) >= new Date(from) &&
        new Date(expense.spentAt) <= new Date(to),
    );
  }

  return filteredExpenses;
};

const getExpenses = async (id) => {
  return Expense.findByPk(id);
};

const deleteExpenses = async (id) => {
  await Expense.destroy({
    where: {
      id: id,
    },
  });
};

const patchExpenses = async (id, newExpense) => {
  await Expense.update(newExpense, {
    where: {
      id: id,
    },
  });

  return getExpenses(id);
};

module.exports = {
  patchExpenses,
  postExpenses,
  getAllExpenses,
  getExpenses,
  deleteExpenses,
};
