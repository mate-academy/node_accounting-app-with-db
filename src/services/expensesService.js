const { Op } = require('sequelize');
const { sequelize } = require('../db');
const { Expense } = require('../models/Expense.model');
const usersService = require('../services/usersService');

const init = async () => {
  Expense.sync({ force: true });
};

const normalize = (body) => {
  if (body) {
    const { amount, category, id, note, spentAt, title, userId } = body;

    return {
      amount,
      category,
      id,
      note,
      spentAt,
      title,
      userId,
    };
  }

  return null;
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

  const expenses = await Expense.findAll({
    where: filter,
  });

  return expenses.map((el) => normalize(el));
};

const getById = async (id) => {
  return normalize(await Expense.findByPk(id));
};

const create = async (data) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const user = (await usersService.getById(data.userId)) || null;

      if (!user) {
        return null;
      }

      return Expense.create(data);
    });

    if (!result) {
      return;
    }

    return normalize(result);
  } catch (err) {
    return 'error';
  }
};

const update = async (id, body) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const expense = await getById(id);

      if (!expense) {
        return null;
      }

      await Expense.update(body, { where: { id } });

      return getById(id);
    });

    return normalize(result);
  } catch {
    return 'error';
  }
};

const remove = (id) => {
  return Expense.destroy({
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
