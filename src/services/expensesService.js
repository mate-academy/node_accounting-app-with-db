'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/expenseModel');

const getAllExpenses = ({ from, to, categories, userId }) => {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = {
      [Op.in]: Array.isArray(categories)
        ? categories
        : [categories],
    };
  }

  if (from) {
    where.spentAt = { [Op.gte]: from };
  }

  if (to) {
    where.spentAt = {
      ...where.spentAt,
      [Op.lte]: to,
    };
  }

  return Expense.findAll({
    where,
    order: [
      'id',
    ],
  });
};

const getExpenseById = (expenseId) => {
  return Expense.findByPk(Number(expenseId));
};

const createExpense = (requestBody) => {
  return Expense.create({ ...requestBody });
};

const removeExpense = (expenseId) => {
  return Expense.destroy({
    where: { id: expenseId },
  });
};

const updateExpense = (expenseId, expenseData) => {
  return Expense.update({ ...expenseData }, {
    where: { id: Number(expenseId) },
  });
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
