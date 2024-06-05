const {
  models: { Expense },
} = require('../models/models');
const { Op } = require('sequelize');

const getAll = async (userId, categories, from, to) => {
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

const getById = async (id) => {
  return Expense.findByPk(id);
};

const create = async ({ userId, spentAt, title, amount, category, note }) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const remove = async (id) => {
  await Expense.destroy({ where: { id } });
};

const update = async (id, { spentAt, title, amount, category, note }) => {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return null;
  }

  if (spentAt) {
    expense.spentAt = spentAt;
  }

  if (title) {
    expense.title = title;
  }

  if (amount) {
    expense.amount = amount;
  }

  if (category) {
    expense.category = category;
  }

  if (note) {
    expense.note = note;
  }

  await expense.save();

  return expense;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
