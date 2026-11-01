'use strict';

const { Expense } = require('../models/Expense.model');
const { Op } = require('sequelize');

const getById = async (id) => {
  const expense = await Expense.findByPk(id);

  return expense;
};

const create = async (data) => {
  return Expense.create(data);
};

const update = async (id, data) => {
  const expense = await getById(id);

  if (!expense) {
    return null;
  }

  return expense.update(data);
};

const remove = async (id) => {
  return Expense.destroy({ where: { id } });
};

const getAll = async ({ userId, categories, from, to }) => {
  const where = {};

  if (categories) {
    const splited = categories.split(',');

    where.category = splited;
  }

  if (userId) {
    where.userId = userId;
  }

  if (from || to) {
    const spentAt = {};

    if (from) {
      spentAt[Op.gte] = from;
    }

    if (to) {
      spentAt[Op.lte] = to;
    }

    where.spentAt = spentAt;
  }

  return Expense.findAll({ where, order: [['id', 'ASC']] });
};

module.exports = {
  getById,
  create,
  update,
  remove,
  getAll,
};
