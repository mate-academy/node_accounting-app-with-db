const { models } = require('../models/models');
const Expense = models.Expense;
const { Op } = require('sequelize');

const getAll = async (queryParams) => {
  const { userId, categories, from, to } = queryParams;
  const filter = {};

  if (userId) {
    filter.userId = userId;
  }

  if (categories) {
    filter.category = Array.isArray(categories)
      ? { [Op.in]: categories }
      : categories;
  }

  if (from || to) {
    filter.spentAt = {};

    if (from) {
      filter.spentAt[Op.gte] = new Date(from);
    }

    if (to) {
      filter.spentAt[Op.lte] = new Date(to);
    }
  }

  const result = await Expense.findAll({ where: filter });

  return result;
};

const getById = async (id) => {
  return Expense.findByPk(id);
};

const create = async (body) => {
  return Expense.create(body);
};

const deleteById = async (id) => {
  await Expense.destroy({ where: { id } });
};

const updateById = async (id, updates) => {
  await Expense.update(updates, { where: { id } });

  return Expense.findByPk(id);
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  updateById,
};
