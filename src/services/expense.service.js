'use strict';

const { Op } = require('sequelize');
const {
  models: { Expense },
} = require('../models/models');
const AppError = require('../errors/AppError');

const getAllExpenses = async (filters = {}) => {
  const { userId, categories, from, to } = filters;
  const where = {};

  if (userId !== undefined) {
    if (isNaN(Number(userId))) {
      throw new AppError(400, 'Invalid userId');
    }
    where.userId = Number(userId);
  }

  if (categories) {
    const categoryList = categories.split(',').map((c) => c.trim());

    if (!categoryList.length) {
      throw new AppError(400, 'Invalid categories filter');
    }
    where.category = { [Op.in]: categoryList };
  }

  if (from || to) {
    where.spentAt = {};

    if (from) {
      const fromDate = new Date(from);

      if (isNaN(fromDate)) {
        throw new AppError(400, 'Invalid "from" date');
      }
      where.spentAt[Op.gte] = fromDate;
    }

    if (to) {
      const toDate = new Date(to);

      if (isNaN(toDate)) {
        throw new AppError(400, 'Invalid "to" date');
      }
      where.spentAt[Op.lte] = toDate;
    }
  }

  return Expense.findAll({ where });
};

const getExpenseById = async (id) => {
  if (isNaN(Number(id))) {
    throw new AppError(400, 'Invalid expense ID');
  }

  const expense = await Expense.findByPk(id);

  if (!expense) {
    throw new AppError(404, 'Expense not found');
  }

  return expense;
};

const createExpense = async ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  if (!userId || !spentAt || !title || !amount || !category) {
    throw new AppError(400, 'Missing required fields');
  }

  if (isNaN(Number(amount)) || Number(amount) <= 0) {
    throw new AppError(400, 'Invalid amount');
  }

  const date = new Date(spentAt);

  if (isNaN(date)) {
    throw new AppError(400, 'Invalid spentAt date');
  }

  return Expense.create({
    userId,
    spentAt: date,
    title: title.trim(),
    amount: Number(amount),
    category: category.trim(),
    note: note?.trim() || null,
  });
};

const updateExpense = async (id, data) => {
  const expense = await getExpenseById(id);

  await expense.update(data);

  return expense;
};

const deleteExpense = async (id) => {
  const expense = await getExpenseById(id);

  await expense.destroy();
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
