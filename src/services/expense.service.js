const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

function getAll({ userId, categories, from, to } = {}) {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    const categoryList = categories.split(',');

    where.category = {
      [Op.in]: categoryList,
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

  return Expense.findAll({ where });
}

function getByCategory(category) {
  return Expense.findAll({
    where: {
      category,
    },
  });
}

function getById(id) {
  return Expense.findByPk(id);
}

function getByUserId(userId) {
  return Expense.findAll({
    where: {
      userId,
    },
  });
}

function createExpense(expense) {
  return Expense.create(expense);
}

async function deleteById(id) {
  return Expense.destroy({
    where: {
      id,
    },
  });
}

async function update({ id, body }) {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return null;
  }

  return expense.update(body, {
    silent: true,
  });
}

function resetExpenses() {
  return Expense.destroy({
    where: {},
    truncate: true,
  });
}

const expensesService = {
  getAll,
  getByCategory,
  getById,
  getByUserId,
  createExpense,
  deleteById,
  update,
  resetExpenses,
};

module.exports = {
  expensesService,
};
