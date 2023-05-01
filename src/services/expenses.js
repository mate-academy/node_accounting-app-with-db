'use strict';

const { Expense } = require('../models/expenses.js');
const { Op } = require('sequelize');

const getExpenses = ({ from, to, category, userId }) => {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (category) {
    where.category = { [Op.in]: category };
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
      'spentAt',
    ],
  });
};

const getExpensesById = (expenseId) => {
  return Expense.findByPk(expenseId);
};

const createExpense = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note = 'Any notes',
}) => {
  return Expense.create({
    userId, spentAt, title, amount, category, note,
  });
};

const removeExpense = (expenseId) => {
  Expense.destroy({
    where: {
      id: expenseId,
    },
  });
};

const updateExpense = (expenseId, body) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note = 'Any notes',
  } = body;

  return Expense.update({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  }, {
    where: {
      id: expenseId,
    },
  });
};

module.exports = {
  getExpenses,
  getExpensesById,
  createExpense,
  removeExpense,
  updateExpense,
};
