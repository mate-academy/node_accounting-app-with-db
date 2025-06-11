const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAllExpenses = (filters = {}) => {
  const filterConditions = {};

  if (filters.userId) {
    filterConditions.userId = filters.userId;
  }

  if (filters.from && filters.to) {
    filterConditions.spentAt = {
      [Op.between]: [new Date(filters.from), new Date(filters.to)],
    };
  }

  if (filters.categories) {
    const categoriesArray = Array.isArray(filters.categories)
      ? filters.categories
      : [filters.categories];

    filterConditions.category = {
      [Op.in]: categoriesArray,
    };
  }

  return Expense.findAll({ where: filterConditions });
};

const getExpenseById = async (id) => {
  return Expense.findByPk(id);
};

const createExpense = async (expense) => {
  return Expense.create(expense);
};

const removeExpense = async (id) => {
  return Expense.destroy({ where: { id } });
};

const updateExpense = async (id, updateData) => {
  const [, [updatedExpense]] = await Expense.update(updateData, {
    where: { id },
    returning: true,
  });

  return updatedExpense;
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
