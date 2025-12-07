'use strict';

const { sequelize } = require('../db.js');
const { DataTypes } = require('sequelize');

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUID,
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
    createdAt: false,
  },
);

const normalizeExpense = ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
});

const normalizeExpenses = (expenses) => {
  const normalized = expenses
    .filter((expense) => expense)
    .map((expense) => normalizeExpense(expense.get({ plain: true })));

  return normalized.length === 1 ? normalized[0] : normalized;
};

module.exports = {
  Expense,
  normalizeExpenses,
};
