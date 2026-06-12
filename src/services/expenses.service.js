const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

async function getAllExpenses(query) {
  const where = {};

  if (query.userId) {
    where.userId = Number(query.userId);
  }

  if (query.categories) {
    const categories = Array.isArray(query.categories)
      ? query.categories
      : query.categories.split(',');

    where.category = {
      [Op.in]: categories,
    };
  }

  if (query.from || query.to) {
    where.spentAt = {};

    if (query.from) {
      where.spentAt[Op.gte] = new Date(query.from);
    }

    if (query.to) {
      where.spentAt[Op.lte] = new Date(query.to);
    }
  }

  return Expense.findAll({ where });
}

async function createExpense(data) {
  return Expense.create({
    userId: data.userId,
    spentAt: data.spentAt || new Date(),
    title: data.title,
    amount: data.amount,
    category: data.category,
    note: data.note,
  });
}

async function getExpenseById(id) {
  return Expense.findByPk(id);
}

async function deleteExpense(id) {
  const expenseForDelete = await Expense.findByPk(id);

  if (!expenseForDelete) {
    return null;
  }

  await expenseForDelete.destroy();

  return true;
}

async function updateExpense(id, data) {
  const expenseForUpdate = await Expense.findByPk(id);

  if (!expenseForUpdate) {
    return null;
  }

  if (data.spentAt !== undefined) {
    expenseForUpdate.spentAt = data.spentAt;
  }

  if (data.title !== undefined) {
    expenseForUpdate.title = data.title;
  }

  if (data.amount !== undefined) {
    expenseForUpdate.amount = data.amount;
  }

  if (data.category !== undefined) {
    expenseForUpdate.category = data.category;
  }

  if (data.note !== undefined) {
    expenseForUpdate.note = data.note;
  }

  await expenseForUpdate.save();

  return expenseForUpdate;
}

module.exports = {
  getAllExpenses,
  createExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
};
