'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/expenseModel');

const getExpenses = (userId, from, to, categories) => {
  const query = {
    where: {},
  };

  if (userId) {
    query.where.userId = userId;
  }

  if (categories) {
    query.where.category = categories;
  }

  if (from && to) {
    query.where.date = {
      [Op.between]: [from, to],
    };
  } else if (from) {
    query.where.date = {
      [Op.gte]: from,
    };
  } else if (to) {
    query.where.date = {
      [Op.lte]: to,
    };
  }

  return Expense.findAll(query);
};

const getById = (id) => {
  return Expense.findByPk(id);
};

const create = (expenseData) => {
  return Expense.create({
    ...expenseData,
  });
};

const update = (id, dataToUpdate) => {
  return Expense.update({ ...dataToUpdate }, {
    where: { id },
  });
};

const remove = (id) => {
  return Expense.destroy({
    where: { id },
  });
};

module.exports = {
  getExpenses,
  getById,
  create,
  update,
  remove,
};
