const { Op } = require('sequelize');
const {
  models: { Expense },
} = require('../models/models');

const allExpenses = async (userId, categories, from, to) => {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = categories;
  }

  if (from || to) {
    where.spentAt = {
      [Op.between]: [from || new Date(0), to || new Date()],
    };
  }

  return Expense.findAll({ where });
};

const expenseById = async (id) => {
  return Expense.findByPk(id);
};

const createExpense = async ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const updateExpense = async (
  id,
  { spentAt, title, amount, category, note },
) => {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return null;
  }

  if (spentAt !== undefined) {
    expense.spentAt = spentAt;
  }

  if (title !== undefined) {
    expense.title = title;
  }

  if (amount !== undefined) {
    expense.amount = amount;
  }

  if (category !== undefined) {
    expense.category = category;
  }

  if (note !== undefined) {
    expense.note = note;
  }

  await expense.save();

  return expense;
};

const deleteExpense = async (id) => {
  await Expense.destroy({ where: { id } });
};

module.exports = {
  allExpenses,
  expenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
