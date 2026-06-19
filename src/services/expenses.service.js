'use strict';

const { Op } = require('sequelize');

const {
  models: { Expense },
} = require('../models/models');

const getAll = (userId, categories, from, to) => {
  const params = {};

  if (userId) {
    params.userId = userId;
  }

  if (categories) {
    params.category = { [Op.in]: categories };
  }

  if (from || to) {
    params.spentAt = {};

    if (from) {
      params.spentAt[Op.gte] = from;
    }

    if (to) {
      params.spentAt[Op.lte] = to;
    }
  }

  return Expense.findAll({
    where: params,
  });
};

const getById = (id) => Expense.findByPk(id);

const create = async (userId, spentAt, title, amount, category, note) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const remove = (id) => {
  return Expense.destroy({ where: { id } });
};

const update = (id, data) => {
  return Expense.update(data, { where: { id }, returning: true });
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
