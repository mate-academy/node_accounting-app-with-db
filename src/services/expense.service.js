const {
  models: { Expense },
} = require('../models/models');
const { Op } = require('sequelize');

async function getExpenses(userId, categories, from, to) {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (Array.isArray(categories)) {
    where.category = {
      [Op.in]: categories,
    };
  } else if (categories) {
    where.category = categories;
  }

  if (from && to) {
    where.spentAt = {
      [Op.between]: [from, to],
    };
  } else if (from) {
    where.spentAt = {
      [Op.gt]: from,
    };
  } else if (to) {
    where.spentAt = {
      [Op.lt]: to,
    };
  }

  return Expense.findAll({ where });
}

async function createExpense(expenseData) {
  return Expense.create(expenseData);
}

function getExpense(id) {
  return Expense.findByPk(id);
}

async function deleteExpense(id) {
  const rows = await Expense.destroy({
    where: {
      id,
    },
  });

  return rows === 1;
}

async function updateExpense(id, expenseData) {
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
}

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
