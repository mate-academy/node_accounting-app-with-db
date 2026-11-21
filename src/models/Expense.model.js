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
      type: DataTypes.UUID,
      allowNull: false,
    },
    spentAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const value = this.getDataValue('amount');

        return value === null || value === undefined ? value : Number(value);
      },
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'expenses',
    timestamps: false,
  },
);

module.exports = {
  Expense,
};
