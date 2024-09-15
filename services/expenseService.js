'use strict';

const { Op } = require('sequelize');
const { models } = require('../src/models/models');

const getExpenses = async(userId, categories, from, to) => {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (Array.isArray(categories)) {
    where.category = { [Op.in]: categories };
  } else if (typeof categories === 'string') {
    where.category = categories;
  }

  if (from) {
    where.spentAt = { [Op.gte]: new Date(from) };
  }

  if (to) {
    where.spentAt = { [Op.lte]: new Date(to) };
  }

  const expenses = await models.Expense.findAll({
    where,
    order: ['id'],
  });

  return expenses;
};

const getExpenseById = async(id) => {
  return models.Expense.findByPk(id);
};

const createExpense = async(userId, spentAt, title, amount, category, note) => {
  return models.Expense.create({
    userId,
    spentAt: new Date(spentAt),
    title,
    amount,
    category,
    note,
  });
};

const updateExpense = async(id, spentAt, title, amount, category, note) => {
  const updateParams = {};

  if (spentAt) {
    updateParams.spentAt = new Date(spentAt);
  }

  if (title) {
    updateParams.title = title;
  }

  if (amount) {
    updateParams.amount = amount;
  }

  if (category) {
    updateParams.category = category;
  }

  if (note) {
    updateParams.note = note;
  }

  const [status, updatedRows] = await models.Expense.update(updateParams, {
    where: {
      id,
    },
    returning: [
      'id', 'userId', 'spentAt', 'title', 'amount', 'category', 'note',
    ],
  });

  if (status === 0) {
    return null;
  }

  return updatedRows[0];
};

const deleteExpense = async(id) => {
  const result = await models.Expense.destroy({
    where: {
      id,
    },
  });

  if (result !== 1) {
    return null;
  }

  return true;
};

module.exports = {
  getExpenses,
  getExpenseById,
  deleteExpense,
  createExpense,
  updateExpense,
};
