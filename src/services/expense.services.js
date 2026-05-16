const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAll = async () => {
  return Expense.findAll();
};

const getById = async (id) => {
  return Expense.findByPk(id);
};

const create = async (data) => {
  return Expense.create(data);
};

const update = async (id, data) => {
  return Expense.update(data, { where: { id } });
};

const remove = async (id) => {
  return Expense.destroy({ where: { id } });
};

const filterByQuery = async (query) => {
  const { categories, from, to, userId } = query;
  const where = {};

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    where.spentAt = {
      [Op.between]: [fromDate, toDate],
    };
  }

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = categories;
  }

  return Expense.findAll({ where });
};

module.exports = {
  getAll,
  create,
  update,
  remove,
  getById,
  filterByQuery,
};
