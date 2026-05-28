'use strict';

const { Expense } = require('../models/Expense.model.js');
const { Op } = require('sequelize');

const getAllExpenses = () => {
  return Expense.findAll();
};

const getByQuery = async (query) => {
  if (!query || Object.keys(query).length === 0) {
    return getAllExpenses();
  }

  const { userId, categories, from, to } = query;
  const whereConditions = {};

  if (userId) {
    whereConditions.userId = +userId;
  }

  if (categories) {
    const categoryList = Array.isArray(categories)
      ? categories
      : categories.split(',');

    whereConditions.category = {
      [Op.in]: categoryList,
    };
  }

  if (from && to) {
    whereConditions.spentAt = {
      [Op.between]: [new Date(from), new Date(to)],
    };
  }

  return Expense.findAll({
    where: whereConditions,
    order: [['spentAt', 'ASC']],
  });
};

const getExpenseById = async (id) => {
  return Expense.findByPk(id);
};

const createExpense = async ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const deleteExpense = (id) => {
  return Expense.destroy({ where: { id } });
};

const updateExpense = (id, expenseData) => {
  return Expense.update(expenseData, { where: { id } });
};

module.exports = {
  getAllExpenses,
  getByQuery,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
