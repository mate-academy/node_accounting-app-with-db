'use strict';

const { DataTypes, Op } = require('sequelize');
const sequelize = require('../database/db');

const Expense = sequelize.define(
  'Expense',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    spentAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'expenses',
    updatedAt: false,
  }
);

const getAllExpenses = async({ userId, categories, from, to }) => {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = { [Op.in]: [categories] };
  }

  if (from && to) {
    where.spentAt = { [Op.between]: [from, to] };
  }

  return Expense.findAll({
    where,
    order: ['id'],
  });
};

const getExpenseById = async(expenseId) => {
  const result = await Expense.findByPk(expenseId);

  return result;
};

const createExpense = async(body) => {
  const result = await Expense.create({ ...body });

  return result;
};

const updateExpense = async(expenseId, name) => {
  const expense = await Expense.findByPk(expenseId);
  const result = await expense.update({ ...name });

  return result;
};

const removeExpense = async(expenseId) => {
  const result = await Expense.destroy({
    where: {
      id: {
        [Op.eq]: [expenseId],
      },
    },
  });

  return result;
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  removeExpense,
  Expense,
};
