'use strict';

const { Expense } = require('../models/Expense.model');
const { User } = require('../models/User.model');
const { Op } = require('sequelize');

const createExpense = async (expense) => {
  const user = await User.findByPk(expense.userId);

  if (!user) {
    return null;
  } else {
    return Expense.create(expense);
  }
};

const findExpenses = (filters) => {
  const where = {};

  if (filters.userId) {
    where.userId = filters.userId;
  }

  if (filters.categories) {
    where.category = filters.categories;
  }

  if (filters.from || filters.to) {
    where.spentAt = {};
  }

  if (filters.from) {
    where.spentAt[Op.gte] = filters.from;
  }

  if (filters.to) {
    where.spentAt[Op.lte] = filters.to;
  }

  return Expense.findAll({
    where,
    attributes: [
      'id',
      'spentAt',
      'title',
      'amount',
      'category',
      'note',
      'userId',
    ],
  });
};

const getExpenseId = (expense) => {
  return Expense.findByPk(expense, {
    attributes: [
      'id',
      'spentAt',
      'title',
      'amount',
      'category',
      'note',
      'userId',
    ],
  });
};

const patchExpenseId = async (id, expenseBody) => {
  const expenseId = await getExpenseId(id);

  if (!expenseId) {
    return null;
  } else {
    await Expense.update(expenseBody, { where: { id: id }, silent: true });

    const updateExpense = await getExpenseId(id);

    return updateExpense;
  }
};

const deleteExpenseId = async (id) => {
  const expenseRemoved = await getExpenseId(id);

  if (!expenseRemoved) {
    return null;
  } else {
    return Expense.destroy({ where: { id: id } });
  }
};

module.exports = {
  createExpense,
  findExpenses,
  getExpenseId,
  patchExpenseId,
  deleteExpenseId,
};
