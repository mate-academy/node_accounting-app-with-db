'use strict';

const { Expense } = require('../models/Expense');
const generateUniqueId = require('generate-unique-id');
const { sequelize } = require('../utils/db');

function normalize({ id, userId, title, amount, category, note }) {
  return {
    id, userId, title, amount, category, note,
  };
}

function getAll() {
  return Expense.findAll();
};

function getExpenseByCategory(category) {
  return Expense.findOne({ where: { category } });
}

function getExpenseByUser(userId) {
  return Expense.findAll({
    include: {
      model: User,
      where: {
        user_id: { userId },
      },
    },
  });
}

async function getExpensesBetweenDates(from, to) {
  const result = await sequelize.query(`
  SELECT *
  FROM expenses
  WHERE spent_at::date >= $1::date'
  AND spent_at::date <= $2::date
`, [from, to]);

  return result.rows;
}

function getExpenseById(expenseId) {
  return Expense.findByPk(expenseId);
}

function createExprense(userId, title, amount, category, note) {
  const id = Number(generateUniqueId({
    length: 8,
    useLetters: false,
  }));

  return Expense.create({
    id, userId, title, amount, category, note,
  });
}

function removeExpense(expenseId) {
  return Expense.destroy({
    where: { id: expenseId },
  });
}

function updateExpense({ id, userId, title, amount, category, note }) {
  return Expense.update({
    userId, title, amount, category, note,
  }, {
    where: { id },
  });
}

module.exports = {
  getAll,
  getExpenseById,
  createExprense,
  removeExpense,
  updateExpense,
  getExpenseByCategory,
  getExpenseByUser,
  getExpensesBetweenDates,
  normalize,
};
