'use strict';

const { Expense } = require('../models/expenses');
const { Op } = require('sequelize');

async function getAll() {
  return Expense.findAll();
}

function getAllWithFilter(options) {
  const {
    userId,
    categories,
    from,
    to,
  } = options;

  const filterCondition = {};

  if (userId) {
    filterCondition.userId = { [Op.eq]: userId };
  }

  if (categories) {
    filterCondition.category = { [Op.eq]: categories };
  }

  if (from && to) {
    const fromDate = new Date(from).toISOString();
    const toDate = new Date(to).toISOString();

    filterCondition.spentAt = { [Op.between]: [fromDate, toDate] };
  }

  return Expense.findAll({ where: filterCondition });
}

function getById(id) {
  return Expense.findByPk(id);
}

async function create(userId, spentAt, title, amount, category, note) {
  return Expense.create({
    userId,
    spentAt: isNaN(new Date(spentAt))
      ? undefined
      : new Date(spentAt).toISOString(),
    title,
    amount,
    category,
    note,
  });
}

async function remove(id) {
  await Expense.destroy({
    where: { id },
  });
}

async function update({ id, ...expenseData }) {
  return Expense.update({ ...expenseData }, {
    where: { id },
    returning: true,
    plain: true,
  });
}

module.exports = {
  getAll,
  getAllWithFilter,
  getById,
  create,
  remove,
  update,
};
