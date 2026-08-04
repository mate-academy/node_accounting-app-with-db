const { Op } = require('sequelize');
const { Expense } = require('../models/models').models;

const getAll = async ({ userId, from, to, categories }) => {
  const whereClause = {};

  if (userId) {
    whereClause.userId = userId;
  }

  if (categories) {
    whereClause.category = { [Op.in]: categories };
  }

  if (from || to) {
    whereClause.spentAt = {};

    if (from) {
      whereClause.spentAt[Op.gte] = new Date(from);
    }

    if (to) {
      whereClause.spentAt[Op.lte] = new Date(to);
    }
  }

  return Expense.findAll({ where: whereClause });
};

const getById = async (id) => {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    throw new Error('Not found');
  }

  return expense;
};

const create = async (data) => {
  const expense = await Expense.create(data);

  return expense;
};

const update = async (id, data) => {
  const expense = await getById(id);

  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) {
      delete data[key];
    }
  });

  await expense.update(data);

  return expense;
};

const remove = async (id) => {
  const expense = await getById(id);

  await expense.destroy();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
