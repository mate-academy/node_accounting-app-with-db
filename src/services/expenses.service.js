const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

function normalize({ id, userId, spentAt, title, amount, category, note }) {
  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
}

function getExpenses(userId, categories, from, to) {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = {
      [Op.in]: Array.isArray(categories) ? categories : [categories],
    };
  }

  if (from && to) {
    where.spentAt = {
      [Op.between]: [from, to],
    };
  }

  return Expense.findAll({
    where,
  });
}

async function createExpense(userId, spentAt, title, amount, category, note) {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
}

function getExpense(id) {
  return Expense.findByPk(id);
}

async function removeExpense(id) {
  await Expense.destroy({
    where: {
      id,
    },
  });
}

async function updateExpense(id, fields) {
  await Expense.update(fields, {
    where: {
      id,
    },
  });
}

module.exports = {
  normalize,
  getExpenses,
  createExpense,
  getExpense,
  removeExpense,
  updateExpense,
};
