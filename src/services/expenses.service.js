'use strict';

const Expenses = require('../models/expenses.model');

const getAllExpenses = async(userId, categories, from, to) => {
  let expenses = await Expenses.findAll();

  if (categories && userId) {
    expenses = expenses.filter(item => item.category === categories);
  };

  if (userId) {
    expenses = expenses.filter(item => item.userId === Number(userId));
  }

  if (from && to) {
    expenses = expenses.filter(
      item => item.spentAt > from && item.spentAt < to);
  }

  return expenses;
};

const getExpensesById = async(id) => {
  return Expenses.findByPk(id);
};

const createExpenses = (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  const item = {
    id: Math.floor(Math.random() * 10000),
    userId: Number(userId),
    spentAt,
    title,
    amount,
    category,
    note,
  };

  return Expenses.create(item);
};

const removeExpenses = async(id) => {
  await Expenses.destroy({
    where: {
      id,
    },
  });
};

const updateExpenses = (id, title) => {
  return Expenses.update(title, { where: { id } });
};

module.exports = {
  getAllExpenses,
  getExpensesById,
  createExpenses,
  removeExpenses,
  updateExpenses,
};
