'use strict';

const { Op } = require('sequelize');
const {
  models: { Expense },
} = require('../models/models');

const getAll = async ({ userId, categories, from, to } = {}) => {
  const where = {};

  if (userId !== undefined) {
    where.userId = Number(userId);
  }

  if (categories) {
    const cats = Array.isArray(categories) ? categories : [categories];

    where.category = { [Op.in]: cats };
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

  const expenses = await Expense.findAll({ where });

  return expenses.map((e) => e.toJSON());
};

const getById = async (id) => {
  const expense = await Expense.findByPk(id);

  return expense ? expense.toJSON() : null;
};

const create = async ({ userId, spentAt, title, amount, category, note }) => {
  const expense = await Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return expense.toJSON();
};

const update = async (id, data) => {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return null;
  }

  const allowedFields = ['spentAt', 'title', 'amount', 'category', 'note'];
  const updates = Object.fromEntries(
    allowedFields.filter((key) => key in data).map((key) => [key, data[key]]),
  );

  await expense.update(updates);

  return expense.toJSON();
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
