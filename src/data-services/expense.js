'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../data-models/expense-model.js');

function getAll() {
  return Expense.findAll({
    order: ['createdAt'],
  });
}

function getOne(expenseId) {
  return Expense.findByPk(expenseId);
}

function getFiltered(filterParams) {
  const { userId, category, from, to } = filterParams;

  const params = {};

  if (userId) {
    params.userId = userId;
  }

  if (category) {
    params.category = category;
  }

  if (from && to) {
    params.spentAt = {
      [Op.between]: [from, to],
    };
  }

  return Expense.findAll({
    where: params,
    order: ['createdAt'],
  });
}

function create(
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
}

async function deleteOne(expenseId) {
  await Expense.destroy({
    where: {
      id: expenseId,
    },
  });
}

async function modifyOne(expenseId, expenseBody) {
  await Expense.update(expenseBody, {
    where: {
      id: expenseId,
    },
  });
}

module.exports = {
  getAll,
  getOne,
  getFiltered,
  create,
  deleteOne,
  modifyOne,
};
