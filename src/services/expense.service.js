'use strict';

const { Expense } = require('../models/Expense.model.js');
const { Op } = require('sequelize');

const getAll = async ({ userId, categories, from, to }) => {
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
    where.category = {
      [Op.in]: categories.split(','),
    };
  }

  return Expense.findAll({ where });
};

const getById = async (id) => {
  return Expense.findByPk(id);
};

const create = (expenseData) => {
  return Expense.create(expenseData);
};

const remove = async (id) => {
  return Expense.destroy({
    where: { id },
  });
};

const update = async (id, data) => {
  const expense = await getById(id);

  if (!expense) {
    return null;
  }

  return expense.update(data);
};

const reset = async () => {
  return Expense.destroy({ truncate: true, cascade: true });
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  reset,
};
