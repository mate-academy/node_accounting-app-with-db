/* eslint-disable no-return-await */
/* eslint-disable no-param-reassign */
'use strict';

const { Expense } = require('../models/Expense.model');

const clearExpenses = () => {
  Expense.sync({ force: true });
};

const getExpenses = async (userId, from, to, categories) => {
  let filteredExpenses = await Expense.findAll();

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expens) => expens.userId === +userId,
    );
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter((expens) => {
      const expenseDate = new Date(expens.spentAt);
      const fromDate = new Date(from);
      const toDate = new Date(to);

      return expenseDate >= fromDate && expenseDate <= toDate;
    });
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (expens) => expens.category === categories,
    );
  }

  return filteredExpenses;
};

const getExpensesById = async (id) => {
  return await Expense.findByPk(id);
};

const createExpense = async (newExpense) => {
  const { userId, spentAt, title, amount } = newExpense;

  return await Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category: newExpense.category || 'none',
    note: newExpense.note || '',
  });
};

const changeExpense = async (id, updateExpense) => {
  await Expense.update(updateExpense, { where: { id } });

  return await Expense.findByPk(id);
};

const deleteExpense = async (id) => {
  await Expense.destroy({
    where: { id },
  });
};

module.exports = {
  clearExpenses,
  getExpenses,
  getExpensesById,
  createExpense,
  changeExpense,
  deleteExpense,
};
