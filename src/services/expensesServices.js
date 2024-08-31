/* eslint-disable no-console */
const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getExpenses = async (userId, categories, from, to) => {
  try {
    const exp = await Expense.findAll({
      where: {
        ...(categories && { category: { [Op.in]: categories } }),
        ...(userId && { userId }),
        ...(from && to && { spentAt: { [Op.between]: [from, to] } }),
        ...(from && { spentAt: { [Op.gt]: from } }),
        ...(to && { spentAt: { [Op.lt]: to } }),
      },
    });

    return exp;
  } catch (error) {
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
