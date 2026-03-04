const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

async function getAll({ userId, categories, from, to }) {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories?.length) {
    where.category = {
      [Op.in]: Array.isArray(categories) ? categories : [categories],
    };
  }

  if (from && to) {
    where.spentAt = {
      [Op.between]: [from, to],
    };
  }

  return Expense.findAll({ where });
}

async function getById(id) {
  return Expense.findByPk(id);
}

async function create(params) {
  return Expense.create(params);
}

async function deleteById(id) {
  return Expense.destroy({
    where: {
      id,
    },
  });
}

async function update(id, params) {
  return Expense.update(params, { where: { id } });
}

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
};
