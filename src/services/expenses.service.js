const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAll = (userId, category, from, to) => {
  const whereClause = {};

  if (userId) {
    whereClause.userId = userId;
  }

  if (from || to) {
    whereClause.spentAt = {};

    if (from) {
      whereClause.spentAt[Op.gte] = from;
    }

    if (to) {
      whereClause.spentAt[Op.lte] = to;
    }
  }

  if (category) {
    whereClause.category = category;
  }

  return Expense.findAll({ where: whereClause });
};

const getById = (id) => {
  return Expense.findByPk(id);
};

const create = (body) => {
  return Expense.create(body);
};

const update = (id, body) => {
  return Expense.update(
    { ...body },
    {
      where: {
        id,
      },
    },
  );
};

const deleteById = (id) => {
  Expense.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
