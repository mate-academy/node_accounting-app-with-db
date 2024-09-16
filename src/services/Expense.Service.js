'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

async function getAll({ userId, categories, from, to }) {
  const filterParams = {};

  if (userId) {
    filterParams.userId = { [Op.eq]: [userId] };
  }

  if (categories) {
    filterParams.category = { [Op.in]: [categories] };
  }

  if (from && to) {
    filterParams.spentAt = { [Op.between]: [from, to] };
  }

  const expenses = await Expense.findAll({
    where: {
      [Op.and]: [filterParams],
    },
  });

  return expenses;
}

async function getExpenseById(id) {
  return Expense.findByPk(+id);
}

async function createExpense(body) {
  const expense = await Expense.create(body);

  return expense;
}

async function updateExpense({ body, id }) {
  await Expense.update(body, { where: { id } });
}

async function deleteExpense(id) {
  await Expense.destroy({ where: { id } });
}

module.exports = {
  getAll,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
