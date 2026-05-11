const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAllExpenses = async (query) => {
  const { userId, categories, from, to } = query;
  const whereObj = {};

  if (userId) {
    whereObj.userId = userId;
  }

  if (categories) {
    whereObj.category = {
      [Op.in]: Array.isArray(categories) ? categories : [categories],
    };
  }

  if (from || to) {
    whereObj.spentAt = {};

    if (from) {
      whereObj.spentAt[Op.gte] = new Date(from);
    }

    if (to) {
      whereObj.spentAt[Op.lte] = new Date(to);
    }
  }

  const result = await Expense.findAll({ where: whereObj });

  return result;
};

const getExpenseById = async (id) => {
  const expense = await Expense.findOne({ where: { id } });

  return expense;
};

const createExpense = async (expenseData) => {
  const newExpense = await Expense.create(expenseData);

  return newExpense;
};

const updateExpense = async (id, data) => {
  const { userId, spentAt, amount, title, category, note } = data;

  const formatedData = {};

  if (userId) {
    formatedData.userId = userId;
  }

  if (spentAt) {
    formatedData.spentAt = new Date(spentAt);
  }

  if (amount) {
    formatedData.amount = amount;
  }

  if (title) {
    formatedData.title = title;
  }

  if (category) {
    formatedData.category = category;
  }

  if (note) {
    formatedData.note = note;
  }

  const existing = await Expense.findOne({ where: { id } });

  if (!existing) {
    return null;
  }

  await Expense.update(formatedData, { where: { id } });

  const expense = await Expense.findOne({ where: { id } });

  return expense;
};

const deleteExpense = async (id) => {
  const deleteCount = await Expense.destroy({ where: { id } });

  return deleteCount > 0;
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
