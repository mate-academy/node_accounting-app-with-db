'use strict';

const { Expense } = require('./../models/Expense.model');
const { Op } = require('sequelize');

const getAllExpenses = () => {
  return Expense.findAll();
};

const getExpenseById = (id) => {
  return Expense.findByPk(id);
};

const getExpenseByParams = (params) => {
  if (!params || Object.keys(params).length === 0) {
    return getAllExpenses();
  }

  const { userId, categories, from, to } = params;
  const paramsObj = {};

  if (userId) {
    paramsObj.userId = Number(userId);
  }

  if (categories) {
    const categoriesList = Array.isArray(categories)
      ? categories
      : categories.split(',');

    paramsObj.category = {
      [Op.in]: categoriesList,
    };
  }

  if (from && to) {
    paramsObj.spentAt = {
      [Op.between]: [new Date(from), new Date(to)],
    };
  }

  return Expense.findAll({
    where: paramsObj,
    order: [['spentAt', 'ASC']],
  });
};

const createExpense = ({ userId, spentAt, title, amount, category, note }) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const deleteExpense = (id) => {
  return Expense.destroy({ where: { id } });
};

const updateExpense = async (id, payload) => {
  // return Expense.update(payload, { where: { id } });
  await Expense.update(payload, { where: { id } });

  return Expense.findByPk(id);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  getExpenseByParams,
  createExpense,
  deleteExpense,
  updateExpense,
};
