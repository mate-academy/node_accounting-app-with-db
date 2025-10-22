const { Expense } = require('../models/Expense.model');
const { Op } = require('sequelize');

const getAll = (filter) => Expense.findAll({ where: expenseFilter(filter) });

const getById = (id) => Expense.findByPk(id);

const create = (expenseData) => Expense.create(expenseData);

const update = async (id, expenseData) => {
  await Expense.update(expenseData, { where: { id } });

  return Expense.findByPk(id);
};

const remove = (id) => Expense.destroy({ where: { id } });

const expenseFilter = ({ userId, categories, from, to }) => {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    const cats = categories.split(',');

    where.category = { [Op.in]: cats };
  }

  if (from || to) {
    where.spentAt = {};
  }

  if (from) {
    where.spentAt[Op.gte] = new Date(from);
  }

  if (to) {
    where.spentAt[Op.lte] = new Date(to);
  }

  return where;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
