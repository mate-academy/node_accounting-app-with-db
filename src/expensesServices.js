/* eslint-disable no-console */
const { Op } = require('sequelize');
const { Expense } = require('./models/Expense.model');

function getAllExpenses(queries) {
  const whereConditions = {};

  if (!queries || Object.keys(queries).length === 0) {
    try {
      return Expense.findAll();
    } catch (err) {
      throw err;
    }
  }

  if (queries.userId) {
    whereConditions.userId = queries.userId;
  }

  if (queries.categories) {
    whereConditions.category = queries.categories;
  }

  if (queries.from) {
    whereConditions.spentAt = { [Op.gte]: queries.from };
  }

  if (queries.to) {
    whereConditions.spentAt = {
      ...whereConditions.spentAt,
      [Op.lte]: queries.to,
    };
  }

  try {
    return Expense.findAll({ where: whereConditions });
  } catch (err) {
    throw err;
  }
}

function getExpenseById(expenseId) {
  try {
    return Expense.findByPk(expenseId);
  } catch (err) {
    throw err;
  }
}

function addExpense(userId, spentAt, amount, title, category, note) {
  try {
    return Expense.create({
      userId: userId,
      spentAt: spentAt,
      amount: amount,
      title: title,
      category: category,
      note: note,
    });
  } catch (err) {
    throw err;
  }
}

function deleteExpense(expenseId) {
  try {
    return Expense.destroy({ where: { id: expenseId } });
  } catch (err) {
    throw err;
  }
}

function updateExpense(expenseId, updating) {
  try {
    return Expense.update(updating, { where: { id: expenseId } });
  } catch (err) {
    throw err;
  }
}

function validateNewExpense(req, res, next) {
  const { userId, spentAt, title, amount } = req.body;

  if (!userId || !spentAt || !title || !amount) {
    return res.sendStatus(400);
  }

  next();
}

module.exports = {
  getAllExpenses,
  addExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
  validateNewExpense,
};
