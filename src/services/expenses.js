'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.js');

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

async function getAll({ userId, categories, from, to }) {
  const whereObj = {};

  if (userId) {
    whereObj.userId = userId;
  }

  if (categories) {
    whereObj.category = { [Op.or]: categories };
  }

  if (from) {
    whereObj.spentAt = { [Op.gt]: from };
  }

  if (to) {
    whereObj.spentAt = {
      ...whereObj.spentAt,
      [Op.lt]: to,
    };
  }

  const filteredExpenses = await Expense.findAll({
    order: [ 'createdAt' ],
    where: whereObj,
  });

  return filteredExpenses;
}

function getById(expenseId) {
  return Expense.findByPk(+expenseId);
}

function create(expense) {
  return Expense.create(expense);
}

async function remove(expenseId) {
  await Expense.destroy({
    where: { id: +expenseId },
  });
}

function update({ expenseId, data }) {
  return Expense.update({ data }, {
    where: { id: +expenseId },
  });
}

module.exports = {
  normalize,
  getAll,
  getById,
  create,
  remove,
  update,
};
