'use strict';

const { Op } = require('sequelize');

const { Expense } = require('../models/Expense.model.js');

const getExpenses = ({ categories, from, to, userId }) => {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = categories;
  }

  if (from && to) {
    where.spentAt = {
      [Op.between]: [new Date(from), new Date(to)],
    };
  }

  return Expense.findAll({ where });
};

const getExpenseById = (id) => {
  return Expense.findByPk(id);
};

const createExpense = (expense) => {
  return Expense.create({ ...expense });
};

const updateExpenseById = async(id, expense) => {
  const [numOfRowsUpdated, [updatedExpense]] = await Expense.update(
    { ...expense },
    {
      returning: true,
      where: { id },
    }
  );

  return numOfRowsUpdated > 0 ? updatedExpense : null;
};

const deleteExpenseById = (id) => {
  return Expense.destroy({ where: { id } });
};

module.exports = {
  getExpenses,
  createExpense,
  getExpenseById,
  updateExpenseById,
  deleteExpenseById,
};
