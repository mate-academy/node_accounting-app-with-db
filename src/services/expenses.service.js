const { Op } = require('sequelize');
const { models, normalizeExpenses } = require('../models/models');
const { Expense } = models;

const reset = async () => {
  await Expense.destroy({ where: {} });
};

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
      [Op.iLike]: categories,
    };
  }

  const expenses = await Expense.findAll({ where });

  return normalizeExpenses(expenses);
};

const getOne = async (id) => {
  const expense = await Expense.findOne({ where: { id } });

  return normalizeExpenses([expense]);
};

const create = async (data, user) => {
  const { spentAt, title, amount, category, note } = data;

  if (!spentAt || !title || amount === undefined || !category || !note) {
    throw new Error('Missing required fields');
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
  await Expense.update(data, { where: { id } });

  const updatedExpesnse = await getOne(id);

  return updatedExpesnse;
};

const remove = async (id) => {
  const deletedCount = await Expense.destroy({ where: id });

  return deletedCount > 0;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  reset,
};
