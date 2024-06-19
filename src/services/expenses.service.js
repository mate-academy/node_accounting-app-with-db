const { op } = require('sequelize');
const {
  models: { Expense },
} = require('../models/models');

const getExpenses = async (userId, categories, from, to) => {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (Array.isArray(categories)) {
    where.category = {
      [op.in]: categories,
    };
  } else if (categories) {
    where.category = categories;
  }

  if (from && to) {
    where.spentAt = {
      [op.between]: [from, to],
    };
  } else if (from) {
    where.spentAt = {
      [op.gt]: from,
    };
  } else if (to) {
    where.spentAt = {
      [op.lt]: to,
    };
  }

  return Expense.findAll({ where });
};

const addExpense = async ({ expenseData }) => {
  return Expense.create(expenseData);
};

const getExpense = (id) => {
  return Expense.findByPk(+id);
};

const deleteExpense = async (id) => {
  const rows = await Expense.destroy({
    where: {
      id,
    },
  });

  return rows === 1;
};

const updateExpense = async (id, expenseData) => {
  try {
    const [, [expense]] = await Expense.update(expenseData, {
      where: {
        id,
      },
      returning: true,
    });

    return expense;
  } catch (error) {
    throw new Error('invalid data');
  }
};

module.exports = {
  getExpenses,
  getExpense,
  deleteExpense,
  addExpense,
  updateExpense,
};
