/* eslint-disable indent */
const { Expense } = require('../models/Expense.model');
const { Op } = require('sequelize');

const clearExpenses = async () => {
  try {
    await Expense.destroy({ truncate: true });
  } catch (error) {
    throw new Error('Failed to clear expenses');
  }
};

const getAllExpenses = async ({ userId, categories, from, to }) => {
  try {
    const expenses = await Expense.findAll({
      where: {
        ...(userId && { userId }),
        ...(categories?.length > 0 && {
          category: categories,
        }),
        ...(from &&
          to && {
            spentAt: {
              [Op.between]: [from, to],
            },
          }),
      },
    });

    return expenses;
  } catch {
    return [];
  }
};

const getExpenses = async (id) => {
  try {
    const res = await Expense.findByPk(+id);

    return res;
  } catch {
    return [];
  }
};

const createExpenses = async (body) => {
  try {
    const expenses = await Expense.create({
      ...body,
    });

    return expenses;
  } catch {
    return null;
  }
};

const updateExpenses = async (id, body) => {
  try {
    const expenses = await Expense.update(body, {
      where: { id },
      returning: true,
      plain: true,
    });

    return expenses[1];
  } catch {
    return null;
  }
};

const removeExpenses = async (id) => {
  try {
    const result = await Expense.destroy({ where: { id } });

    return result;
  } catch {
    return null;
  }
};

module.exports = {
  getAllExpenses,
  getExpenses,
  createExpenses,
  removeExpenses,
  updateExpenses,
  clearExpenses,
};
