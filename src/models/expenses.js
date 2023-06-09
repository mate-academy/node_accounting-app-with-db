'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const { Category } = require('./categories');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spentAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'expenses',
  timestamps: false,
});

Expense.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Expense, { foreignKey: 'categoryId' });

module.exports = { Expense };
