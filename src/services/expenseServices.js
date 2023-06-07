'use strict';

const { Expense } = require('../models/expense');
const { Op } = require('sequelize');

function getExpenses(userId, categories, from, to) {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = {
      [Op.in]: categories,
    };
  }

  if (from && to) {
    where.spentAt = {
      [Op.between]: [from, to],
    };
  }

  return Expense.findAll();
};

function getExpenseById(id) {
  return Expense.findByPk(id);
};

function createExpense(body) {
  return Expense.create(body);
};

function deleteExpense(id) {
  return Expense.destroy({
    where: { id },
  });
};

function updateExpense(expense, data) {
  return Expense.update(data, {
    where: { id: expense.id },
  });
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
