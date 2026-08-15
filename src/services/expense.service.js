'use strict';

const model = require('../models/models.js');
const { Op } = require('sequelize');

function createExpenseService() {
  const normalizeExpense = ({
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  }) => ({
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  const getAllExpenses = (userId, categories, from, to) => {
    const where = {};

    if (userId) {
      where.userId = Number(userId);
    }

    if (categories) {
      where.category = {
        [Op.in]: categories.split(',').map((category) => category.trim()),
      };
    }

    if (from || to) {
      where.spentAt = {};

      if (from) {
        where.spentAt[Op.gte] = new Date(from);
      }

      if (to) {
        where.spentAt[Op.lte] = new Date(to);
      }
    }

    return model.models.Expense.findAll({
      where,
    });
  };

  const getExpenseById = (expenseId) => {
    return model.models.Expense.findByPk(expenseId);
  };

  const createExpense = (expenseData) => {
    return model.models.Expense.create(expenseData);
  };

  const removeExpense = async (expenseId) => {
    const expense = await model.models.Expense.findByPk(expenseId);

    if (!expense) {
      return false;
    }

    await expense.destroy();

    return true;
  };

  const updateExpense = async (expenseId, updates) => {
    const expense = await model.models.Expense.findByPk(expenseId);

    if (!expense) {
      return null;
    }

    await expense.update(updates);

    return expense;
  };

  return {
    normalizeExpense,
    getAllExpenses,
    getExpenseById,
    createExpense,
    removeExpense,
    updateExpense,
  };
}

module.exports = createExpenseService;
