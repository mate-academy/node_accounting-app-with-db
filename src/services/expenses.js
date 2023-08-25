'use strict';

const { Expense } = require('../models');
const { Op } = require('sequelize');

async function getAll(params) {
  const {
    userId,
    categories,
    from,
    to,
  } = params;

  const whereClause = {};

  if (userId) {
    whereClause.userId = userId;
  }

  if (from) {
    whereClause.spentAt = { [Op.gte]: new Date(from) };
  }

  if (to) {
    whereClause.spentAt = {
      ...whereClause.spentAt, [Op.lte]: new Date(to),
    };
  }

  if (categories) {
    whereClause.category = categories;
  }

  const expenses = await Expense.findAll({ where: whereClause });

  return expenses;
}

async function create(body) {
  const newExpense = await Expense.create(body);

  return newExpense;
}

async function getById(expenseId) {
  const foundExpense = await Expense.findByPk(expenseId);

  return foundExpense;
}

async function remove(expenseId) {
  await Expense.destroy({
    where: {
      id: expenseId,
    },
  });
}

async function update(id, expenseBody) {
  const expense = await getById(id);

  if (!expense) {
    return null;
  }

  await expense.update(expenseBody);

  return expense;
}

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
