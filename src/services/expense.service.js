'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');
const { User } = require('../models/User.model');

const getAll = async (query = {}) => {
  const { userId, from, to, categories } = query;
  const where = {};

  if (userId) {
    where.userId = Number(userId);
  }

  if (from || to) {
    where.spentAt = {};

    if (from) {
      where.spentAt[Op.gte] = new Date(from);
    }

    if (to) {
      where.spentAt[Op.lte] = new Date(to);
    }
  }

  if (categories) {
    const categoryList = Array.isArray(categories)
      ? categories
      : categories.split(',').map((c) => c.trim());

    where.category = { [Op.in]: categoryList };
  }

  return Expense.findAll({ where });
};

const getById = async (id) => {
  return Expense.findByPk(id);
};

const create = async (data) => {
  const { userId, title, amount, spentAt, category, note } = data || {};

  // 1. Обов'язковими є ТІЛЬКИ userId, title та amount!
  if (!userId || !title || amount === undefined || amount === null) {
    const error = new Error('Missing required fields');

    error.status = 400;
    throw error;
  }

  const user = await User.findByPk(userId);

  if (!user) {
    const error = new Error('User not found');

    error.status = 400;
    throw error;
  }

  // 2. Явно підставляємо 'Uncategorized' та поточну дату,
  // якщо опціональні поля category чи spentAt відсутні у запиті
  return Expense.create({
    userId,
    title,
    amount,
    category: category || 'Uncategorized',
    spentAt: spentAt || new Date(),
    note: note || null,
  });
};

const update = async (id, body) => {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return null;
  }

  await expense.update(body);

  return expense;
};

const remove = async (id) => {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return false;
  }

  await expense.destroy();

  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
