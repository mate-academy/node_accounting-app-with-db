const { models } = require('../models/models');
const { Expense } = models;

const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

async function getAllExpenses({ userId, from, to, categories }) {
  const where = {};

  if (userId) {
    where.userId = Number(userId);
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    where.spentAt = {
      [Op.gte]: fromDate,
      [Op.lte]: toDate,
    };
  }

  if (categories) {
    const cats = categories.split(',');

    where.category = {
      [Op.in]: cats,
    };
  }

  return Expense.findAll({
    where: where,
    attributes: [
      'id',
      'userId',
      'spentAt',
      'title',
      'amount',
      'category',
      'note',
    ],
  });
}

async function createExpense(data) {
  const newExpense = await Expense.create({ ...data });

  return newExpense;
}

async function getExpenseById(id) {
  return Expense.findByPk(id);
}

async function deleteExpense(id) {
  const deletedRows = await Expense.destroy({
    where: { id },
  });

  return deletedRows > 0;
}

async function updateExpense(id, updates) {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return null;
  }

  await expense.update(updates);

  return expense;
}

async function reset() {
  await Expense.destroy({ truncate: true, where: {} });
}

module.exports = {
  getAllExpenses,
  createExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
  reset,
};
