'use strict';

const { Op } = require('sequelize');
const Expenses = require('../models/expenses.model');

const getAllExpenses = async(userId, categories, from, to) => {
  const whereClause = {};

  if (userId) {
    whereClause.userId = userId;
  }

  if (categories) {
    whereClause.categories = categories;
  }

  if (from && to) {
    whereClause.spentAt = { [Op.between]: [from, to] };
  }

  return Expenses.findAll({ where: whereClause });
};

const getExpensesById = async(id) => {
  return Expenses.findByPk(id);
};

const createExpenses = (
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  const item = {
    id,
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
