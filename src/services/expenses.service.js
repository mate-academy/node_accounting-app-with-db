const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAllExpenses = async ({ userId, from, to, categories }) => {
  const where = {};

  if (userId) {
    where.userId = Number(userId);
  }

  if (from || to) {
    where.spentAt = {};

    if (from && !isNaN(new Date(from).getTime())) {
      where.spentAt[Op.gte] = new Date(from).toISOString();
    }

    if (to && !isNaN(new Date(to).getTime())) {
      where.spentAt[Op.lte] = new Date(to).toISOString();
    }
  }

  if (categories) {
    const categoryList = categories.split(',');
    where.category = {
      [Op.in]: categoryList,
    };
  }

  return Expense.findAll({ where });
};

const getExpenseById = (id) => {
  return Expense.findByPk(id);
};

const createExpense = (reqBody) => {
  return Expense.create(reqBody);
};

const updateExpense = async (id, reqBody) => {
  await Expense.update({ ...reqBody }, { where: { id } });
  return getExpenseById(id);
};

const deleteExpense = async (id) => {
  await Expense.destroy({ where: { id } });
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
