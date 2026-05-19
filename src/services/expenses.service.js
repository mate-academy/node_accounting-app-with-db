const { Op } = require('sequelize');
const { models } = require('../models/models.js');
const Expense = models.Expense;

const getByQuery = async (queries) => {
  const { userId, categories, from, to } = queries;

  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = {
      [Op.in]: categories,
    };
  }

  if (from || to) {
    where.spentAt = {};
  }

  if (from) {
    where.spentAt[Op.gte] = new Date(from);
  }

  if (to) {
    where.spentAt[Op.lte] = new Date(to);
  }

  return Expense.findAll({
    where,
  });
};

const create = async (data) => {
  const { userId, spentAt, title, amount, category, note } = data;

  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const getById = async (id) => {
  return Expense.findByPk(id);
};

const deleteById = async (id) => {
  return Expense.destroy({
    where: {
      id,
    },
  });
};

const update = async (id, data) => {
  await Expense.update(data, {
    where: {
      id,
    },
  });

  return Expense.findByPk(id);
};

module.exports = {
  getByQuery,
  create,
  getById,
  deleteById,
  update,
};
