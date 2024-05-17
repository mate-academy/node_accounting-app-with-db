const { Expense } = require('../models/Expense.model');
const { Op } = require('sequelize');

const getAllExpenses = async ({ userId, categories, from, to }) => {
  const whereClause = {};

  if (userId) {
    whereClause.userId = userId;
  }

  if (categories) {
    whereClause.category = categories;
  }

  if (from && to) {
    whereClause.spentAt = {
      [Op.between]: [from, to],
    };
  }

  const filteredExpenses = await Expense.findAll({ where: whereClause });

  return filteredExpenses;
};

const createNewExpense = async (data) => {
  const newExpense = await Expense.create({ ...data });

  return newExpense;
};

const getExpenseById = async (id) => {
  const expense = await Expense.findByPk(id);

  return expense;
};

const removeExpenseById = async (id) => {
  await Expense.destroy({ where: { id } });
};

const updateExpenseById = async (id, data) => {
  await Expense.update(
    { ...data },
    {
      where: { id },
    },
  );
};

module.exports = {
  getAllExpenses,
  createNewExpense,
  getExpenseById,
  removeExpenseById,
  updateExpenseById,
};
