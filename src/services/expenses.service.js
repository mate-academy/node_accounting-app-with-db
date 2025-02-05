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
      filter.spentAt[Op.gte] = from;
    }

    if (to) {
      filter.spentAt[Op.lte] = to;
    }
  }

  const result = await Expense.findAll({
    where: filter,
  });

  return result;
};

const getById = async (id) => {
  const result = await Expense.findByPk(id);

  return result;
};

const create = async (body) => {
  const result = await Expense.create(body);

  return result;
};

const deleteById = async (id) => {
  await Expense.destroy({ where: { id } });
};

const updateById = async (id, updates) => {
  await Expense.update(updates, { where: { id } });

  const updatedExpense = await Expense.findByPk(id);

  return updatedExpense;
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  updateById,
};
