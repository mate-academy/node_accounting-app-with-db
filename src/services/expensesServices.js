/* eslint-disable no-console */
const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getExpenses = async (userId, categories, from, to) => {
  try {
    const whereClause = {};

    if (categories && Array.isArray(categories) && categories.length > 0) {
      whereClause.category = { [Op.in]: categories };
    }

    if (userId) {
      whereClause.userId = userId;
    }

    if (from && to) {
      whereClause.spentAt = { [Op.between]: [new Date(from), new Date(to)] };
    } else if (from) {
      whereClause.spentAt = { [Op.gte]: from };
    } else if (to) {
      whereClause.spentAt = { [Op.lte]: new Date(to) };
    }

    const exp = await Expense.findAll({
      where: whereClause,
    });

    return exp;
  } catch (error) {
    console.error('Error fetching expenses:', error); // Lepsze logowanie błędów
    throw error;
  }
};

const getOneExpense = async (id) => {
  try {
    const selectedExpense = await Expense.findByPk(id);

    return selectedExpense;
  } catch (error) {
    throw error;
  }
};

const createExpense = async (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  const newExpense = await Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return newExpense;
};

const removeExpense = async (id) => {
  try {
    const remove = await Expense.destroy({
      where: { id },
    });

    return remove > 0;
  } catch (error) {
    throw error;
  }
};

const updateExpense = async (
  id,
  { userId, spentAt, title, amount, category, note },
) => {
  try {
    const [updatedcount, updatedrow] = await Expense.update(
      {
        ...(userId && { userId }),
        ...(spentAt && { spentAt }),
        ...(title && { title }),
        ...(amount && { amount }),
        ...(category && { category }),
        ...(note && { note }),
      },
      {
        where: { id },
        returning: true,
      },
    );

    if (updatedcount === 0) {
      return null;
    }

    return updatedrow[0];
  } catch (error) {
    return error;
  }
};

module.exports = {
  updateExpense,
  removeExpense,
  createExpense,
  getExpenses,
  getOneExpense,
};
