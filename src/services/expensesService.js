const { Expense } = require('../models/Expense.model');
const { Op } = require('sequelize');

const createExpense = (expenseData) => {
  return Expense.create(expenseData);
};

const getAllExpenses = async (query) => {
  const where = {};

  if (query.userId) {
    where.userId = Number(query.userId);
  }

  if (query.from || query.to) {
    where.spentAt = {};
  }

  if (query.from) {
    where.spentAt[Op.gte] = query.from;
  }

  if (query.to) {
    where.spentAt[Op.lte] = query.to;
  }

  if (query.categories) {
    where.category = { [Op.in]: query.categories.split(',') };
  }

  return Expense.findAll({ where });
};

const getExpenseById = (id) => {
  return Expense.findByPk(id);
};

const deleteExpense = async (id) => {
  const deleted = await Expense.destroy({ where: { id } });

  if (deleted === 0) {
    return null;
  }

  return deleted;
};

const updateExpense = async (id, expenseData) => {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return null;
  }

  await expense.update(expenseData);

  return expense;
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  deleteExpense,
  updateExpense,
};
