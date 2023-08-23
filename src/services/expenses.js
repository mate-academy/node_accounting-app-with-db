'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/Expense');

const getAll = async(params) => {
  const {
    userId,
    categories,
    from,
    to,
  } = params;

  const prepairedParams = {};

  if (userId) {
    prepairedParams.userId = userId;
  }

  if (categories) {
    prepairedParams.category = {
      [Op.in]: categories,
    };
  }

  if (from && to) {
    prepairedParams.spentAt = {
      [Op.gte]: from,
      [Op.lte]: to,
    };
  }

  const expensesToReturn = await Expense.findAll({
    where: prepairedParams,
  });

  return expensesToReturn;
};

const getOne = (id) => {
  return Expense.findByPk(id);
};

const add = (expense) => {
  return Expense.create(expense);
};

const update = async(id, expenseData) => {
  await Expense.update(expenseData, { where: { id } });

  return getOne(id);
};

const remove = async(id) => {
  await Expense.destroy({ where: { id } });

  return !!getOne(id);
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
