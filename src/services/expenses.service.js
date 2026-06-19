'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAll = async ({ userId, categories, from, to }) => {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories?.length) {
    where.category = categories;
  }

  if (from || to) {
    where.spentAt = {};

    if (from) {
      where.spentAt[Op.gte] = from;
    }

    if (to) {
      where.spentAt[Op.lte] = to;
    }
  }

  return Expense.findAll({ where });
};

const create = async ({ userId, spentAt, title, amount, category, note }) => {
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

const remove = async (id) => {
  return Expense.destroy({ where: { id } });
};

const update = async ({ id, spentAt, title, amount, category, note }) => {
  return Expense.update(
    {
      spentAt,
      title,
      amount,
      category,
      note,
    },
    { where: { id } },
  );
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
