const { Op } = require('sequelize');
const { sequelize } = require('../db');
const { Expense } = require('../models/Expense.model');
const usersService = require('../services/usersService');

const init = async () => {
  Expense.sync({ force: true });
};

const getAll = async (userId, categories, from, to) => {
  const filter = {};

  if (userId) {
    filter.userId = userId;
  }

  if (categories) {
    filter.category = categories;
  }

  if (from && !to) {
    filter.spentAt = { [Op.gte]: from };
  }

  return Expense.findAll({
    where: filter,
  });
};

const getById = async (id) => {
  return Expense.findByPk(id);
};

const create = async (data) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const user = usersService.getById(data.userId);

      if (!user) {
        return null;
      }

      return Expense.create(data);
    });

    return result;
  } catch {
    return 'error';
  }
};

const update = async (id, body) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const expense = usersService.getById(id);

      if (!expense) {
        return null;
      }

      return Expense.update(body, { where: { id } });
    });

    return result;
  } catch {
    return 'error';
  }
};

const remove = (id) => {
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
  remove,
  init,
};
