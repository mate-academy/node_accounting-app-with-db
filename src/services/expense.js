'use strict';

const { Expenses, User } = require('../utils/db');
const { Op } = require('sequelize');

async function getAll(queryParams) {
  const { userId, categories, from, to } = queryParams;

  const whereClause = {};

  if (userId) {
    whereClause.userId = userId;
  }

  if (categories) {
    whereClause.category = {
      [Op.in]: [].concat(categories),
    };
  }

  if (from && to) {
    whereClause.spentAt = {
      [Op.between]: [from, to],
    };
  }

  const foundExpenses = await Expenses.findAll({
    where: whereClause,
  });

  return foundExpenses;
}

async function getById(expenseId) {
  const foundExpense = await Expenses.findOne({ where: { id: expenseId } });

  return foundExpense;
}

async function create(expense) {
  const Creator = Expenses.belongsTo(User, { foreignKey: 'userId' });

  const newExpense = await Expenses.create({
    title: String(expense.title),
    userId: Number(expense.userId),
    amount: Number(expense.amount),
    category: String(expense.category),
    note: String(expense.note),
  }, {
    include: [ Creator ],
  });

  return newExpense;
}

async function remove(expenseId) {
  await Expenses.destroy({ where: { id: expenseId } });
}

async function update(reqParams) {
  const expense = await Expenses.update(reqParams, {
    where: { id: +reqParams.id },
  });

  return expense;
}

function checkParams(reqParams) {
  const availableParams = [
    'userId',
    'title',
    'amount',
    'category',
  ];

  const bodyKeys = Object.keys(reqParams);

  const requireParams = [];

  for (const param of availableParams) {
    if (!bodyKeys.includes(param)) {
      requireParams.push(param);
    }
  }

  return requireParams;
}

module.exports = {
  checkParams,
  getAll,
  getById,
  create,
  remove,
  update,
};
