/* eslint-disable function-paren-newline */
const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAll = async (filters = {}) => {
  const { userId, from, to, categories } = filters;

  const where = {};

  if (userId) {
    where.userId = Number(userId);
  }

  if (from || to) {
    where.spentAt = {};

    if (from) {
      where.spentAt[Op.gte] = new Date(from);
    }

    if (to) {
      where.spentAt[Op.lte] = new Date(to);
    }
  }

  if (categories) {
    where.category = categories;
  }

  const expenses = await Expense.findAll({ where });

  return expenses;
};

const getById = async (id) => {
  const expense = await Expense.findByPk(id);

  return expense;
};

const create = async (data) => {
  const expense = await Expense.create(data);

  return expense;
};

const remove = async (id) => {
  const deleted = await Expense.destroy({ where: { id } });

  return deleted;
};

const update = async ({ id, ...updateData }) => {
  const [updatedRows] = await Expense.update(updateData, { where: { id } });

  if (updatedRows === 0) {
    return null;
  }

  const expense = await Expense.findByPk(id);

  return expense;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
