/* eslint-disable no-console */
'use strict';

const { Expenses } = require('../models/expenses.js');
const Sequelize = require('sequelize');

const getAll = async({
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
    if (Array.isArray(categories)) {
      whereClause.category = { [Sequelize.Op.in]: categories };
    } else {
      whereClause.category = categories;
    }
  }

  if (from) {
    whereClause.spentAt = { [Sequelize.Op.gte]: new Date(from) };
  }

  if (to) {
    whereClause.spentAt = {
      ...whereClause.spentAt,
      [Sequelize.Op.lte]: new Date(to),
    };
  }

  const expenses = await Expenses.findAll({ where: whereClause });

  return expenses;
};

const getById = async(id) => {
  const expense = await Expenses.findByPk(id);

  return expense;
};

const create = async(data) => {
  const expense = await Expenses.create({
    ...data,
  });

  return expense;
};

const update = async(id, body) => {
  await Expenses.update({ ...body }, {
    where: {
      id,
    },
  });
};

const remove = async(id) => {
  await Expenses.destroy({
    where: {
      id,
    },
  });
};

module.exports.expensesService = {
  getAll,
  getById,
  create,
  update,
  remove,
};
