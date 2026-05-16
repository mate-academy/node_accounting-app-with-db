const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAllExpenses = async ({ userId, categories, from, to }) => {
  const whereParams = {};

  if (userId) {
    whereParams.userId = userId;
  }

  if (categories) {
    whereParams.category = categories;
  }

  if (from || to) {
    whereParams.spentAt = {};

    if (from) {
      whereParams.spentAt[Op.gte] = from;
    }

    if (to) {
      whereParams.spentAt[Op.lte] = to;
    }
  }

  return Expense.findAll({ where: whereParams });
};

const createExpense = async (data) => {
  return Expense.create(data);
};

const getExpenseById = async (id) => {
  return Expense.findByPk(id);
};

const updateExpense = async (id, data) => {
  await Expense.update(data, { where: { id } });

  return getExpenseById(id);
};

const deleteExpense = async (id) => {
  await Expense.destroy({ where: { id } });
};

module.exports = {
  getAllExpenses,
  createExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
