const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAll = async ({ userId, categories, from, to } = {}) => {
  const where = {};

  if (userId !== undefined) {
    where.userId = userId;
  }

  if (categories !== undefined) {
    where.category = categories;
  }

  if (from !== undefined) {
    where.spentAt = { ...where.spentAt, [Op.gte]: from };
  }

  if (to !== undefined) {
    where.spentAt = { ...where.spentAt, [Op.lte]: to };
  }

  return Expense.findAll({ where });
};

const getExpense = async (id) => {
  return Expense.findByPk(id);
};

const create = async (userId, spentAt, title, amount, category, note) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const update = async (id, spentAt, title, amount, category, note) => {
  const exprense = await Expense.findByPk(id);
  const changes = {};

  if (!exprense) {
    return null;
  }

  if (spentAt !== undefined) {
    changes.spentAt = spentAt;
  }

  if (title !== undefined) {
    changes.title = title;
  }

  if (amount !== undefined) {
    changes.amount = amount;
  }

  if (category !== undefined) {
    changes.category = category;
  }

  if (note !== undefined) {
    changes.note = note;
  }

  await exprense.update(changes);

  return exprense;
};

const remove = async (id) => {
  await Expense.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getExpense,
  create,
  update,
  remove,
};
