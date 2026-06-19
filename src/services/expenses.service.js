/* eslint-disable no-console */
const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');
const { User } = require('../models/User.model');

async function getAllExpenses(query) {
  const { userId, categories, from, to } = query;
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (from || to) {
    if (from) {
      where.spentAt = {
        ...(where.spentAt || {}),
        [Op.gte]: new Date(from),
      };
    }

    if (to) {
      where.spentAt = {
        ...(where.spentAt || {}),
        [Op.lte]: new Date(to),
      };
    }
  }

  if (categories) {
    let categoriesArray;

    if (Array.isArray(categories)) {
      categoriesArray = categories;
    } else if (typeof categories === 'string') {
      categoriesArray = categories.split(',').map((cat) => cat.trim());
    }

    if (categoriesArray && categoriesArray.length > 0) {
      where.category = {
        [Op.in]: categoriesArray,
      };
    }
  }

  try {
    const filteredExpenses = await Expense.findAll({
      where,
      order: [['id', 'ASC']],
    });

    return filteredExpenses;
  } catch (error) {
    console.error('Error fetching expenses with Sequelize:', error);
    throw new Error('Failed to retrieve expenses.');
  }
}

async function getExpense(expenseId) {
  try {
    const expense = await Expense.findByPk(expenseId);

    return expense;
  } catch (error) {
    console.error('Error fetching expense:', error);
    throw new Error('Failed to retrieve expense.');
  }
}

async function createExpense(body) {
  const { userId, spentAt, title, amount, category, note } = body;

  try {
    const userExists = await User.findByPk(userId);

    if (!userExists) {
      return false;
    }

    const expenseToAdd = {
      userId: userId,
      spentAt: spentAt || new Date().toISOString(),
      title,
      amount: Number(amount),
      category: category || 'Uncategorized',
      note: note || '',
    };

    const createdExpense = await Expense.create(expenseToAdd);

    return createdExpense;
  } catch (error) {
    console.error('Error creating expense:', error);
    throw new Error('Failed to create expense.');
  }
}

async function deleteExpense(expenseId) {
  try {
    const deletedRows = await Expense.destroy({
      where: {
        id: expenseId,
      },
    });

    return deletedRows > 0;
  } catch (error) {
    console.error('Error removing expense:', error);

    return false;
  }
}

async function updateExpense(expenseId, body) {
  try {
    await Expense.update(
      { ...body },
      {
        where: {
          id: expenseId,
        },
      },
    );

    return true;
  } catch (error) {
    console.error('Error updating expense:', error);
    throw new Error('Failed to update expense.');
  }
}

function normalizeExpense(expense) {
  const { id, userId, spentAt, title, amount, category, note } = expense;

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

module.exports = {
  getAllExpenses,
  getExpense,
  createExpense,
  deleteExpense,
  updateExpense,
  normalizeExpense,
};
