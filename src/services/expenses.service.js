const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const createExpenses = async (data) => {
  return Expense.create(data);
};

const updateExpense = async (id, data) => {
  await Expense.update(
    { ...data },
    {
      where: {
        id,
      },
    },
  );

  return getExpenseById(id);
};
const removeExpense = async (id) => {
  return Expense.destroy({
    where: {
      id,
    },
  });
};
const getExpenseById = async (id) => {
  return Expense.findByPk(id);
};
const getAllExpenses = async ({ userId, categories, from, to }) => {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (Array.isArray(categories)) {
    where.category = {
      [Op.in]: categories,
    };
  }

  if (categories) {
    where.category = categories;
  }

  if (from || to) {
    where.spentAt = {};

    if (from) {
      where.spentAt[Op.gte] = from;
    }

    if (to) {
      where.spentAt[Op.lte] = to;
    }
  }

  return Expense.findAll({ where });
};

module.exports = {
  createExpenses,
  updateExpense,
  removeExpense,
  getAllExpenses,
  getExpenseById,
};
