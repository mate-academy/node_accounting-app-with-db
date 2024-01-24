'use strict';

const { Expense } = require('../db');

const getExpenses = async({ userId, categories, from, to }) => {
  const expenses = await Expense.findAll();

  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === +userId
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter((expense) =>
      categories.includes(expense.category)
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.spentAt >= from
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.spentAt <= to
    );
  }

  return filteredExpenses;
};

const getExpenseById = async(id) => {
  try {
    const expense = await Expense.findByPk(id);

    return expense;
  } catch (err) {
    return null;
  }
};

const createExpense = async(items) => {
  const newExpense = await Expense.create({
    ...items,
  });

  return newExpense;
};

const deleteExpense = async(id) => {
  await Expense.destroy({
    where: { id },
  });
};

const updateExpense = async(id, items) => {
  await Expense.update(
    { ...items },
    {
      where: { id },
    }
  );
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
