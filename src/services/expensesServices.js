'use strict';

const { Expense } = require('../db');

const getAllExpenses = async(userId, categories, from, to) => {
  let filteredExpenses = await Expense.findAll();

  if (userId) {
    filteredExpenses
      = filteredExpenses.filter((expense) => expense.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter((expense) =>
      categories.includes(expense.category)
    );
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter(
      (expense) =>
        new Date(expense.spentAt) >= new Date(from)
        && new Date(expense.spentAt) <= new Date(to)
    );
  }

  return filteredExpenses;
};

const getExpenseById = async(id) => {
  try {
    const filteredExpenses = await Expense.findByPk(id);

    return filteredExpenses;
  } catch (err) {
    return null;
  }
};

const addNewExpense = async expense => {
  const newExpense = await Expense.create({
    ...expense,
  });

  return newExpense;
};

const removeExpense = async(id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

const updateExpense = async({ id }, title) => {
  await Expense.update(
    { ...title },
    {
      where: {
        id,
      },
    },
  );

  const expense = await getExpenseById(id);

  return expense;
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  addNewExpense,
  removeExpense,
  updateExpense,
};
