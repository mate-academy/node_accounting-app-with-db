'use strict';

const { Sequelize } = require('sequelize');
const { Expense } = require('../models/Expense');
const { generateIntId } = require('../utils/generateId');
const { gte, lte } = Sequelize.Op;

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

async function getAll(userId, category, from, to) {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (category) {
    where.category = category;
  }

  if (from) {
    where.spentAt = {
      [gte]: from,
    };
  }

  if (to) {
    where.spentAt = {
      ...where.spentAt,
      [lte]: to,
    };
  }// I'm not sure about this solution with 'where' obj, but it works
  // Please tell me, if there is better way

  const expenses = await Expense.findAll({
    where,
    order: [ 'created_at' ],
  });

  return expenses;
}

function getById(expenseId) {
  return Expense.findByPk(expenseId);
}

function create(newExpense) {
  const id = generateIntId();

  return Expense.create({
    id,
    ...newExpense,
  });
}

function remove(expenseId) {
  return Expense.destroy({
    where: { id: +expenseId },
  });
}

function update(id, updateData) {
  return Expense.update({ ...updateData }, {
    where: { id },
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
