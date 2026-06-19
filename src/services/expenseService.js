const { Op } = require('sequelize');

const { Expense } = require('../models/Expense.model');

const getAllExpenses = async (filters = {}) => {
  const { userId, from, to, category } = filters;
  const whereConditions = {};

  if (userId) {
    whereConditions.userId = +userId;
  }

  if (from && to) {
    whereConditions.spentAt = {
      [Op.between]: [new Date(from), new Date(to)],
    };
  }

  if (category) {
    whereConditions.category = category;
  }

  return Expense.findAll({ where: whereConditions });
};

const getExpenseById = async (id) => {
  try {
    const normalizedId = +id;
    const targetExpense = await Expense.findByPk(normalizedId);

    if (!targetExpense) {
      return { error: 'Expense not found' };
    }

    return { data: targetExpense };
  } catch {
    return { error: 'Failed to get expense by id' };
  }
};

const createExpense = async (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  try {
    const normalizedUserId = +userId;

    const newExpense = await Expense.create({
      userId: normalizedUserId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    return { data: newExpense };
  } catch {
    return { error: 'Failed to create expense' };
  }
};

const deleteExpense = async (id) => {
  try {
    const normalizedId = +id;
    const targetExpense = await Expense.findByPk(normalizedId);

    if (!targetExpense) {
      return { error: 'Expense does not exist' };
    }

    await targetExpense.destroy();

    return { data: null };
  } catch {
    return { error: 'Failed to delete expense' };
  }
};

const updateExpense = async (id, data) => {
  try {
    const normalizedId = +id;
    const targetExpense = await Expense.findByPk(normalizedId);

    if (!targetExpense) {
      return { error: 'Expense not found' };
    }

    await targetExpense.update({ ...data });

    return { data: targetExpense };
  } catch {
    return { error: 'Failed to update expense' };
  }
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
