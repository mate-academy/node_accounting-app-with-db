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

  if (from) {
    whereClause.spentAt = { [Op.gte]: from };
  }

  if (to) {
    whereClause.spentAt = { [Op.lte]: to };
  }

  return Expense.findAll({ where: whereClause });
};

const getExpenceById = async (id) => {
  return Expense.findByPk(id);
};

const createExpence = async (
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

const patchExpence = async (id, data) => {
  await Expense.update(data, {
    where: { id },
  });

  return Expense.findByPk(id);
};

const deleteExpence = async (id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAllExpenses,
  getExpenceById,
  createExpence,
  patchExpence,
  deleteExpence,
};
