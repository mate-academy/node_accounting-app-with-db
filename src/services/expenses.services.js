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

  if (!exprense) {
    return null;
  }

  await exprense.update({
    spentAt,
    title,
    amount,
    category,
    note,
  });

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
