'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/Expense');

function normalize({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
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

function getAll(userId, categories, from, to) {
  return Expense.findAll({
    where: {
      [Op.and]: [
        userId && { userId },
        categories && { categories },
        from && {
          spentAt: {
            [Op.gte]: from,
          },
        },
        to && {
          spentAt: {
            [Op.lte]: to,
          },
        },
      ],
    },
    order: ['createdAt'],
  });
}

function getById(expenseId) {
  return Expense.findByPk(expenseId);
}

function create(expense) {
  return Expense.create(expense);
}

function remove(expenseId) {
  return Expense.destroy({
    where: { id: expenseId },
  });
}

function update({ expenseId, data }) {
  return Expense.update({ ...data }, {
    where: { id: expenseId },
  });
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  normalize,
};
