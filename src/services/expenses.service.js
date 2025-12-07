const { Op } = require('sequelize');
const { models, normalizeExpenses } = require('../models/models');
const { Expense } = models;

const getAll = async (query = {}) => {
  const { userId, from, to, categories } = query;

  const where = {};

  if (userId) {
    where.userId = userId;
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
    where.category = {
      [Op.iLike]: `%${categories}%`,
    };
  }

  const expenses = await Expense.findAll({ where });

  return normalizeExpenses(expenses);
};

const getOne = async (id) => {
  const expense = await Expense.findOne({ where: { id: Number(id) } });

  if (!expense) {
    return null;
  }

  return normalizeExpenses([expense]);
};

const create = async (data, user) => {
  // eslint-disable-next-line prefer-const
  let { spentAt, title, amount, category, note } = data;

  if (!spentAt || !title || amount === undefined) {
    throw new Error('Missing required fields');
  }

  if (!category) {
    category = 'Other';
  }

  if (!note) {
    note = null;
  }

  const newExpense = await Expense.create({
    userId: user.id,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return normalizeExpenses([newExpense]);
};

const update = async (id, data) => {
  const [affected] = await Expense.update(data, { where: { id: Number(id) } });

  if (affected === 0) {
    return null;
  }

  const updatedExpense = await getOne(id);

  return updatedExpense;
};

const remove = async (id) => {
  const deletedCount = await Expense.destroy({ where: { id: Number(id) } });

  return deletedCount > 0;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
