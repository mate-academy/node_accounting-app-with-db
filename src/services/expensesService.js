const { Op } = require('sequelize');
const { models } = require('../models/models.js');
const { Expense } = models;

const getAllExpenses = async (userId, categories, from, to) => {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = { [Op.in]: categories };
  }

  if (from) {
    where.spentAt = { [Op.gte]: new Date(from) };
  }

  if (to) {
    where.spentAt = {
      ...where.spentAt,
      [Op.lte]: new Date(to),
    };
  }

  return Expense.findAll({ where });
};

const getExpensesById = async (id) => {
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

const deleteExpense = async (id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

const updateExpense = async ({ id, title }) => {
  await Expense.update({ title }, { where: { id } });

  return Expense.findByPk(id);
};

module.exports = {
  getAllExpenses,
  getExpensesById,
  createExpense,
  deleteExpense,
  updateExpense,
};
