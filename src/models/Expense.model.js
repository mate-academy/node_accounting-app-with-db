'use strict';

const { sequelize } = require('../db.js');
const { DataTypes } = require('sequelize');

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'userid',
      allowNull: false,
      foreinKey: true,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    spentAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'spentat',
      allowNull: false,
    },
  },
  {
    tableName: 'expenses',
    createdAt: false,
    updatedAt: false,
  },
);

module.exports = { Expense };
