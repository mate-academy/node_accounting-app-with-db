'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAll = async (queryParams) => {
  const { categories, userId, from, to } = queryParams;

  const whereCondition = {};

  if (categories && categories.length > 0) {
    whereCondition.category = { [Op.in]: categories };
  }

  if (userId) {
    whereCondition.userId = userId;
  }

  if (from && to) {
    const startDate = new Date(from);
    const endDate = new Date(to);

    whereCondition.createdAt = {
      [Op.between]: [startDate, endDate],
    };
  }

  const result = await Expense.findAll({
    where: whereCondition,
  });

  return result;
};

const getById = async (id) => {
  return Expense.findByPk(id);
};

const create = async ({ id, userId, title, amount, category, note }) => {
  return Expense.create({
    id,
    userId,
    title,
    amount,
    category,
    note,
  });
};

const update = async ({ id, userId, title, amount, category, note }) => {
  return Expense.update(
    {
      id,
      userId,
      title,
      amount,
      category,
      note,
    },
    { where: { id } },
  );
};

const remove = async (id) => {
  return Expense.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
