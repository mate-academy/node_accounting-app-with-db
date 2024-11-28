const { getUserById } = require('./users.service');

const { Expense } = require('../models/Expense.model');

const sequelize = require('../db');

async function getAllExpenses() {
  const allExpenses = await Expense.findAll();

  return allExpenses;
}

async function resetAllExpenses() {
  await Expense.destroy({ cascade: true, truncate: true });
}

async function getExpenseByQuery(query) {
  const { to, from, userId, categories } = query;
  const where = {};

  if (to && from) {
    where.spentAt = {
      [sequelize.Sequelize.Op.between]: [new Date(from), new Date(to)],
    };
  }

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = categories;
  }

  const filteredExpenses = await Expense.findAll({ where });

  return filteredExpenses;
}

async function getExpenseById(id) {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    throw new Error('Expense not found');
  }

  return expense;
}

async function createExpense(expense) {
  const { userId } = expense;
  const user = await getUserById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const createdExpense = await Expense.create(expense);

  return createdExpense;
}

async function updateExpense(id, updatedExpense) {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    throw new Error('Expense not found');
  }

  const newExpense = await expense.update(updatedExpense);

  return newExpense;
}

async function deleteExpense(id) {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    throw new Error('Expense not found');
  }

  const deletedExpense = await expense.destroy();

  return deletedExpense;
}

module.exports = {
  getAllExpenses,
  getExpenseByQuery,
  getExpenseById,
  resetAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
};
