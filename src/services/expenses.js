'use strict';

const { Expense } = require('../models/Expense');

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

function getAll() {
  return Expense.findAll({
    order: ['createdAt'],
  });
}

function getById(expenseId) {
  return Expense.findByPk(expenseId);
}

function create(userId, spentAt, title, amount, category, note) {
  return Expense.create({
    userId, spentAt, title, amount, category, note,
  });
}

function remove(expenseId) {
  return Expense.destroy({
    where: {
      id: expenseId,
    },
  });
}

function update(expenseId, expenseData) {
  return Expense.update(expenseData, {
    where: { id: expenseId },
  });
};

const expenseService = {
  getAll,
  getById,
  create,
  remove,
  update,
  normalize,
};

module.exports = expenseService;
