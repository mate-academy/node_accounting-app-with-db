'use strict';

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
};

function getAll() {
  return Expense.findAll({
    order: ['createdAt'],
  });
}

function getById(id) {
  return Expense.findOne({
    where: { id },
  });
}

function create({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
}

function update({ id, body }) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = body;

  return Expense.update({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  }, {
    where: { id },
  });
}

function remove(id) {
  return Expense.destroy({
    where: { id },
  });
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  normalize,
};
