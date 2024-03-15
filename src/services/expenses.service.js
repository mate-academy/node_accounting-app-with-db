/* eslint-disable prettier/prettier */
'use strict';

const { Expense } = require('../models/Expense.model');

const getExpenses = async (userId, categories, from, to) => {
  let filteredExpenses = await Expense.findAll();

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  if (categories) {
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
  return Expense.findByPk(id);
};

const createExpenses = async (newExpenses) => {
  return Expense.create(newExpenses);
};

const deleteExpense = async (id) => {
  await Expense.destroy({ where: { id } });
};

const updateExpense = async (id, newExpense) => {
  await Expense.update(newExpense, { where: { id } });

  return getExpenseById(id);
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpenses,
  deleteExpense,
  updateExpense,
};
