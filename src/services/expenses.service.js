/* eslint-disable prettier/prettier */
'use strict';

const { Expense } = require('../models/Expense.model');

const getAllExpenses = async (userId, categories, from, to) => {
  let filteredExpenses = await Expense.findAll();

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  if (categories && categories.length > 0) {
    filteredExpenses = filteredExpenses.filter((expense) =>
      categories.includes(expense.category));
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

const getExpenseById = async (id) => {
  const expense = await Expense.findByPk(id);

  return expense;
};

const createExpense = async (newExpense) => {
  const createdExpense = await Expense.create(newExpense);

  return createdExpense;
};

const updateExpense = async (id, updatedData) => {
  await Expense.update(updatedData, { where: { id } });

  // eslint-disable-next-line no-return-await
  return await Expense.findByPk(id);
};

const removeExpense = async (id) => {
  await Expense.destroy({ where: { id } });
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  removeExpense,
};
