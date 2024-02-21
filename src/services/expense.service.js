'use strict';

const { models } = require('../models/models');
const { Op } = require('sequelize');

const { Expense } = models;

const getAll = () => {
  return Expense.findAll();
};

const getByQueries = ({
  userId,
  categories,
  from,
  to,
}) => {
  const whereClause = {};

  if (userId) {
    whereClause.userId = userId;
  }

  if (categories) {
    const categoriesArray = categories.split(',');

    whereClause.category = { [Op.in]: categoriesArray };
  }

  if (from) {
    whereClause.spentAt = {
      ...whereClause.spentAt,
      [Op.gte]: from,
    };
  }

  if (to) {
    whereClause.spentAt = {
      ...whereClause.spentAt,
      [Op.lte]: to,
    };
  }

  return Expense.findAll({ where: whereClause });
};

const getById = (id) => {
  return Expense.findByPk(id);
};

const create = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const expense = Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return expense;
};

const remove = async(id) => {
  await Expense.destroy({ where: { id } });
};

const update = async(id, expense) => {
  await Expense.update({ ...expense }, { where: { id } });
};

module.exports = {
  getAll,
  getByQueries,
  getById,
  remove,
  update,
  create,
};
