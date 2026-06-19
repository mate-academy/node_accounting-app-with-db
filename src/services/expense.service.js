/* eslint-disable no-console */
const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAll = async ({ from, to, userId, categories }) => {
  const where = {};

  if (from && to) {
    where.spentAt = { [Op.between]: [from, to] };
  } else if (from) {
    where.spentAt = { [Op.gte]: from };
  } else if (to) {
    where.spentAt = { [Op.lte]: to };
  }

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = { [Op.in]: categories };
  }

  const expenses = await Expense.findAll({ where });

  return expenses;
};

const getById = async (id) => {
  const expense = await Expense.findByPk(id);

  return expense;
};

const create = async (body) => {
  const expense = await Expense.create({ ...body });

  return expense;
};

const update = async ({ id, body }) => {
  await Expense.update({ ...body }, { where: { id } });

  const expense = await Expense.findByPk(id);

  return expense;
};

const remove = async (id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
