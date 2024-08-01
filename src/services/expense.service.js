const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAll = () => {
  return Expense.findAll();
};

const getFiltered = async ({ userId, categories, from, to }) => {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories.length > 0) {
    where.category = {
      [Op.in]: categories,
    };
  }

  if (from) {
    where.spentAt = {
      [Op.gte]: from,
    };
  }

  if (to) {
    where.spentAt = {
      [Op.lte]: to,
    };
  }

  const result = await Expense.findAll({
    where,
  });

  return result;
};

const create = (expenseData) => {
  return Expense.create(expenseData);
};

const getById = (id) => {
  return Expense.findByPk(id);
};

const remove = async (id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

const update = ({ id, spentAt, title, amount, category, note }) => {
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
  getFiltered,
  create,
  getById,
  remove,
  update,
};
