const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model.js');

const getAll = ({ from, to, categories, userId }) => {
  const where = {};
  const isDateFilter = from && to;

  if (userId) {
    where.userId = userId;
  }

  if (isDateFilter) {
    where.spentAt = { [Op.between]: [from, to] };
  }

  if (categories) {
    where.category = { [Op.in]: categories.split(',') };
  }

  return Expense.findAll({ where });
};

const getById = (id) => {
  return Expense.findByPk(id);
};

const create = (body) => {
  return Expense.create(body);
};

const remove = (id) => {
  return Expense.destroy({ where: { id } });
};

const update = ({ id, body }) => {
  return Expense.update(body, { where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
