const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAllExpenses = async (userId, categories, from, to) => {
  const whereClause = {};

  if (userId) {
    whereClause.userId = userId;
  }

  if (categories && categories.length > 0) {
    whereClause.category = categories;
  }

  if (from) {
    whereClause.spentAt = { [Op.gte]: from };
  }

  if (to) {
    whereClause.spentAt = { [Op.lte]: to };
  }

  return Expense.findAll({ where: whereClause });
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

const patchExpense = async ({ id, data }) => {
  await Expense.update(data, {
    where: { id },
  });

  return Expense.findByPk(id);
};

const deleteExpense = async (id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  patchExpense,
  deleteExpense,
};
