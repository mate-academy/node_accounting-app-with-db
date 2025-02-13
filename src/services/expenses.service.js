const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAllExpenses = async ({ userId, categories, from, to }) => {
  const filter = {};

  if (userId) {
    filter.userId = userId;
  }

  if (categories) {
    filter.category = Array.isArray(categories)
      ? { [Op.in]: categories }
      : categories;
  }

  if (from || to) {
    filter.spentAt = {};

    if (from) {
      filter.spentAt[Op.gte] = from;
    }

    if (to) {
      filter.spentAt[Op.lte] = to;
    }
  }

  const filteredExpenses = await Expense.findAll({ where: filter });

  return filteredExpenses;
};

const createExpense = async (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  const newExpense = await Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return newExpense;
};

const getExpenseById = async (expenseId) => {
  const findExpense = await Expense.findByPk(expenseId);

  return findExpense;
};

const deleteExpense = async (expenseId) => {
  await Expense.destroy({ where: { id: expenseId } });
};

const updateExpense = async (expenseId, data) => {
  const updatedExpense = await Expense.update(data, {
    where: { id: expenseId },
    returning: true,
  });

  return updatedExpense;
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  deleteExpense,
  updateExpense,
};
