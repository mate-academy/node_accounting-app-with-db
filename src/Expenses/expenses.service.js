/* eslint-disable indent */
const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAllExpenses = async ({ userId, categories, from, to }) => {
  return Expense.findAll({
    where: {
      ...(userId && { userId }),
      ...(categories && { category: { [Op.in]: categories } }),
      ...(from || to
        ? {
            spentAt: {
              ...(from && { [Op.gte]: from }),
              ...(to && { [Op.lte]: to }),
            },
          }
        : {}),
    },
  });
};

const getOneExpense = async (id) => {
  return Expense.findByPk(id);
};

const createExpense = async (expenseItem) => {
  const newExpense = await Expense.create(expenseItem);

  return newExpense;
};

const updateExpense = async (id, paramsToUpdate) => {
  const [updatedCount, updatedExpense] = await Expense.update(paramsToUpdate, {
    where: { id },
    returning: true,
  });

  if (updatedCount === 0) {
    return null;
  }

  return updatedExpense[0];
};

const deleteExpense = async (id) => {
  const deletedCount = await Expense.destroy({ where: { id } });

  return deletedCount > 0;
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
