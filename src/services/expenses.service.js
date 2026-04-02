const { Op } = require('sequelize');
const {
  models: { Expense },
} = require('../models/models');

const getAll = async (filters) => {
  const { userId, category, from, to } = filters;

  const options = { where: {}, order: [] };

  if (userId) {
    options.where.userId = userId;
  }

  if (category) {
    options.where.category = category;
  }

  if (from || to) {
    options.where.spentAt = {};
  }

  if (from) {
    options.where.spentAt[Op.gte] = new Date(from);
  }

  if (to) {
    options.where.spentAt[Op.lte] = new Date(to);
  }

  const expenses = await Expense.findAll(options);

  return expenses;
};

const getById = async (id) => {
  return Expense.findByPk(id);
};

const remove = async (id) => {
  return Expense.destroy({
    where: { id: id },
  });
};

module.exports = {
  getAll,
  getById,
  remove,
};
