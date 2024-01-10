'use strict';

const { Op } = require('sequelize');
const { expenseModel } = require('../models/expenseModel');

const getAllExpenses = async(userId, categories, from, to) => {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.categories = categories;
  }

  if (from && to) {
    where.spentAt = {
      [Op.between]: [new Date(from), new Date(to)],
    };
  }

  return expenseModel.findAll({ where });
};

const getExpenseById = (id) => expenseModel.findByPk(id);

const addNewExpense = async(expense) => {
  const newExpense = await expenseModel.create(expense);

  return newExpense;
};

const removeExpense = (id) => {
  expenseModel.destroy({
    where: {
      id,
    },
  });
};

const updateExpense = async(id, title) => {
  await expenseModel.update({
    title,
  }, {
    where: { id },
  });
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  addNewExpense,
  removeExpense,
  updateExpense,
};
