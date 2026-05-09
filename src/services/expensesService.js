'use strict';

const { Op } = require('sequelize');
const { models } = require('../models/models');
const { Expense } = models;

const getExpenses = async (filters = {}) => {
  const { userId, from, to, categories } = filters;

  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (from && to) {
    where.spentAt = {
      [Op.between]: [new Date(from), new Date(to)],
    };
  } else if (from) {
    where.spentAt = { [Op.gte]: new Date(from) };
  } else if (to) {
    where.spentAt = { [Op.lte]: new Date(to) };
  }

  if (categories) {
    const list = categories.split(',').map((c) => c.trim());

    where.category = { [Op.in]: list };
  }

  return Expense.findAll({ where });
};

const getExpensesById = async (id) => {
  return Expense.findByPk(id);
};

const createExpense = (userId, spentAt, title, amount, category, note) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const deleteExpenseById = async (id) => {
  await Expense.destroy({ where: { id } });
};

const updateExpenseById = async ({
  id,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  await Expense.update(
    {
      spentAt,
      title,
      amount,
      category,
      note,
    },
    { where: { id } },
  );

  return getExpensesById(id);
};

module.exports = {
  getExpenses,
  getExpensesById,
  createExpense,
  deleteExpenseById,
  updateExpenseById,
};
