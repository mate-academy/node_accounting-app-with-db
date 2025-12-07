'use strict';

const { sequelize } = require('../db.js');
const { DataTypes } = require('sequelize');

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

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
      defaultValue: 'Other',
    },

    note: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
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
  const normalized = expenses.filter(Boolean).map((expense) => {
    const plain =
      typeof expense.get === 'function'
        ? expense.get({ plain: true })
        : expense;

    return normalizeExpense(plain);
  });

  if (normalized.length === 0) {
    return null;
  }

  return normalized.length === 1 ? normalized[0] : normalized;
};

module.exports = {
  Expense,
  normalizeExpenses,
};
