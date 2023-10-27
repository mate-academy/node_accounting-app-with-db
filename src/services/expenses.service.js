'use strict';

const Expense = require('../models/Expense.model.js');
const { Op } = require('sequelize');

const getAll = async (params) => {
  const { userId, categories, from, to } = params;

  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = {
      [Op.in]: categories,
    };
  }

  if (from || to) {
    where.spentAt = {};

    if (from) {
      where.spentAt[Op.gte] = from;
    }

    if (to) {
      where.spentAt[Op.lte] = to;
    }
  }

  const filteredExpenses = await Expense.findAll({ where });

  return filteredExpenses;
};

const getOne = async (id) => {
  const one = await Expense.findOne({
    where: {
      id,
    },
  });

  return one;
};

const addExpense = async (expense) => {
  const newExpense = await Expense.create(expense);

  return newExpense;
};

const delExpense = async (id) => {
  const del = await Expense.destroy({
    where: {
      id,
    },
  });

  return del === 0;
};

const editExpense = async (expense, id) => {
  const exp = await Expense.findOne({
    where: {
      id,
    },
  });

  if (exp) {
    let edited = await Expense.update(expense, {
      where: {
        id,
      },
    });

    edited = await Expense.findOne({
      where: {
        id,
      },
    });

    return edited;
  }

  return false;
};

module.exports = {
  getAll,
  addExpense,
  getOne,
  delExpense,
  editExpense,
};
