const { Op } = require('sequelize');
const { models } = require('../models/models.js');
const { Expense } = models;

const getAllExpenses = async (userId, categories, from, to) => {
  const whereClause = {};

  if (userId) {
    whereClause.userId = userId;
  }

  if (categories && categories.length > 0) {
    whereClause.category = categories;
  }

  if (from && to) {
    whereClause.spentAt = { [Op.between]: [from, to] };
  } else if (from) {
    whereClause.spentAt = { [Op.gte]: from };
  } else if (to) {
    whereClause.spentAt = { [Op.lte]: to };
  }

  return Expense.findAll({
    where: whereClause,
  });
};

const getExpenseById = async (id) => {
  return Expense.findByPk(id);
};

const createExpense = async (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const updateExpense = async (id, data) => {
  await Expense.update({ ...data }, { where: { id } });

  return Expense.findByPk(id);
};

const deleteExpense = async (id) => {
  return Expense.destroy({ where: { id } });
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
