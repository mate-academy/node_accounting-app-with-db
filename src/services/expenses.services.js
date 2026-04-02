const { Expense } = require('../models/Expense.model');
const { Op } = require('sequelize');

function normalize({ id, userId, spentAt, title, amount, category, note }) {
  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
}

function getExpenses(data) {
  const { userId, categories, from, to } = data;

  const whereConditions = {};

  if (userId) {
    whereConditions.userId = userId;
  }

  if (categories) {
    const categoriesArray = Array.isArray(categories)
      ? categories
      : [categories];

    whereConditions.category = {
      [Op.in]: categoriesArray,
    };
  }

  if (from || to) {
    whereConditions.spentAt = {};

    if (from) {
      whereConditions.spentAt[Op.gte] = new Date(from);
    }

    if (to) {
      whereConditions.spentAt[Op.lte] = new Date(to);
    }
  }

  return Expense.findAll({
    where: whereConditions,
  });
}

function getExpenseById(id) {
  return Expense.findByPk(id);
}

function createExpense({ userId, spentAt, title, amount, category, note }) {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || '',
  });
}

function deleteExpense(id) {
  return Expense.destroy({
    where: {
      id,
    },
  });
}

async function updateExpense(data) {
  await Expense.update(data, {
    where: {
      id: data.id,
    },
  });

  return Expense.findByPk(data.id);
}

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
  normalize,
};
