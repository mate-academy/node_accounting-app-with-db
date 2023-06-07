'use strict';

const { Expense } = require('../models/Expense');

function getAll() {
  return Expense.findAll({
    order: ['id'],
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

function getById(expenseId) {
  return Expense.findByPk(Number(expenseId));
}

function remove(expenseId) {
  Expense.destroy({
    where: { id: Number(expenseId) },
  });
}

function update({
  id,
  userId,
  spentAt = Date.now(),
  title,
  amount,
  category,
  note,
}) {
  return Expense.update({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  }, {
    where: { id: Number(id) },
  });
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
