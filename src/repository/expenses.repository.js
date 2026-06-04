/* eslint-disable indent */
const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAll = async (query) => {
  const { userId, categories, from, to } = query || {};

  return Expense.findAll({
    where: {
      ...(userId && { userId }),
      ...(categories && { category: categories }),
      ...(from || to
        ? {
            spentAt: {
              ...(from && { [Op.gte]: new Date(from) }),
              ...(to && { [Op.lte]: new Date(to) }),
            },
          }
        : {}),
    },
  });
};

const create = async ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  return Expense.create(expense);
};

const getById = async (id) => {
  return Expense.findByPk(id);
};

const remove = async (id) => {
  await Expense.destroy({ where: { id } });
};

const update = async ({ id, ...rest }) => {
  await Expense.update({ ...rest }, { where: { id } });

  return getById(id);
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
