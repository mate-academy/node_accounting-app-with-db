const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model.js');

const getAllExp = async ({ userId, categories, from, to }) => {
  const params = {};

  if (userId) {
    params.userId = userId;
  }

  if (categories) {
    params.category = categories;
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

  const expList = Expense.findAll({ where: params });

  return expList;
};

const getExpById = async (id) => {
  return Expense.findByPk(id);
};

const createExp = async (data) => {
  return Expense.create(data);
};

const updateExp = async (id, { spentAt, title, amount, category, note }) => {
  await Expense.update(
    {
      spentAt,
      title,
      amount,
      category,
      note,
    },
    { where: { id } },
  );

  return Expense.findByPk(id);
};

const removeExp = async (id) => {
  return Expense.destroy({
    where: { id },
  });
};

module.exports = {
  getAllExp,
  getExpById,
  createExp,
  updateExp,
  removeExp,
};
