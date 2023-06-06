'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/expense.js');

function getAll({ userId, categories, from, to }) {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = { [Op.in]: [categories] };
  }

  if (from && to) {
    where.spentAt = { [Op.between]: [from, to] };
  }

  return Expense.findAll({
    where,
    order: ['id'],
  });
}

async function getById(id) {
  const expense = await Expense.findByPk(id);

  return expense;
}

async function create(expense) {
  const newExpense = await Expense.create({ ...expense });

  return newExpense;
}

async function remove(id) {
  const result = await Expense.destroy({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });

  return result;
}

async function update({ id, ...data }) {
  const expense = Expense.findByPk(id);
  const updatedExpense = await expense.update({ ...data });

  return updatedExpense;
}

module.exports = {
  getAll,
  getById,
  remove,
  update,
  create,
};
