const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');
const { isValidDate } = require('../utils/isValidDate');

const getAll = async ({ userId, categories, from, to }) => {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = {
      [Op.in]: Array.isArray(categories) ? categories : [categories],
    };
  }

  if (from || to) {
    where.spentAt = {};

    if (isValidDate(from)) {
      where.spentAt[Op.gte] = new Date(from);
    }

    if (isValidDate(to)) {
      where.spentAt[Op.lte] = new Date(to);
    }
  }

  return Expense.findAll({ where });
};

const getById = async (id) => {
  return Expense.findByPk(id);
};

const update = async (id, dataToUpdate) => {
  await Expense.update(dataToUpdate, { where: { id } });
};

const remove = async (id) => {
  await Expense.destroy({ where: { id } });
};

const create = (data) => {
  return Expense.create(data);
};

module.exports = {
  getAll,
  getById,
  update,
  remove,
  create,
};
