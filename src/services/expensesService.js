'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

async function get(params) {
  if (!params || Object.keys(params).length === 0) {
    return Expense.findAll();
  }

  const { userId, categories, from, to } = params;
  const query = { where: {} };

  if (userId) {
    query.where.userId = userId;
  }

  if (categories) {
    query.where.category = categories;
  }

  if (from) {
    query.where.spentAt = { ...query.where.spentAt, [Op.gte]: from };
  }

  if (to) {
    query.where.spentAt = { ...query.where.spentAt, [Op.lte]: to };
  }

  return Expense.findAll(query);
}

async function create(data) {
  return Expense.create(data);
}

async function getById(id) {
  return Expense.findByPk(id);
}

function remove(id) {
  return Expense.destroy({ where: { id } });
}

async function update(id, data) {
  return Expense.update(data, { where: { id } });
}

module.exports = {
  get,
  create,
  getById,
  remove,
  update,
};
