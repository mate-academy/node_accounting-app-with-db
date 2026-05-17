const { Expense } = require('../models/Expense.model');
const { Op } = require('sequelize');

const getAllExpense = async (filtersArg = {}) => {
  const filters = {};

  if (filtersArg.from && filtersArg.to) {
    filters.spentAt = {
      [Op.between]: [new Date(filtersArg.from), new Date(filtersArg.to)],
    };
  }

  if (filtersArg.categories) {
    filters.category = {
      [Op.in]: Array.isArray(filtersArg.categories)
        ? filtersArg.categories
        : [filtersArg.categories],
    };
  }

  if (filtersArg.userId) {
    filters.userId = filtersArg.userId;
  }

  return Expense.findAll({
    where: filters,
  });
};

const createExpense = async (expense) => {
  return Expense.create(expense);
};

const getExpenseById = async (id) => {
  return Expense.findByPk(id);
};

const removeExpense = async (id) => {
  return Expense.destroy({ where: { id } });
};

const updateExpense = async ({ id, updateObj }) => {
  const [, [updatedExpense]] = await Expense.update(updateObj, {
    where: { id },
    returning: true,
  });

  return updatedExpense;
};

module.exports = {
  getAllExpense,
  createExpense,
  getExpenseById,
  removeExpense,
  updateExpense,
};
