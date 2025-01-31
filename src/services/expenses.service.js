const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAll = async (userId, categories, from, to) => {
  const whereClause = {};

  if (userId) {
    whereClause.userId = userId;
  }

  if (categories && categories.length > 0) {
    const parsedCategories = Array.isArray(categories)
      ? categories
      : [categories];

    whereClause.category = { [Op.in]: parsedCategories };
  }

  if (from || to) {
    whereClause.spentAt = {};

    if (from) {
      whereClause.spentAt[Op.gte] = from;
    }

    if (to) {
      whereClause.spentAt[Op.lte] = to;
    }
  }

  return Expense.findAll({ where: whereClause });
};

const getById = async (id) => {
  return Expense.findByPk(id);
};

const create = async (userId, spentAt, title, amount, category, note) => {
  const expenseData = {
    userId,
    title,
    amount,
  };

  if (category) {
    expenseData.category = category;
  }

  if (note) {
    expenseData.note = note;
  }

  if (spentAt) {
    expenseData.spentAt = spentAt;
  }

  const expense = await Expense.create(expenseData);

  return expense;
};

const remove = async (id) => {
  await Expense.destroy({ where: { id } });
};

const update = async (id, userId, title, amount, category, note) => {
  const updateData = {};

  if (userId !== undefined) {
    updateData.userId = userId;
  }

  if (title !== undefined) {
    updateData.title = title;
  }

  if (amount !== undefined) {
    updateData.amount = amount;
  }

  if (category !== undefined) {
    updateData.category = category;
  }

  if (note !== undefined) {
    updateData.note = note;
  }

  if (Object.keys(updateData).length === 0) {
    throw new Error('No fields to update');
  }

  await Expense.update(updateData, { where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
