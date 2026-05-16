'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');
const { Category } = require('./Category.model.js');

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
      primaryKey: false,
      allowNull: false,
    },
    spentAt: {
      type: DataTypes.DATE,
      primaryKey: false,
    },
    title: {
      type: DataTypes.STRING,
      primaryKey: false,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      primaryKey: false,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    note: {
      type: DataTypes.STRING,
      primaryKey: false,
      allowNull: true,
    },
  },
  {
    tableName: 'expenses',
  },
);

Expense.belongsTo(Category, {
  foreignKey: 'categoryId',
});

module.exports = {
  Expense,
};
