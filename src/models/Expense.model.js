'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');
const { User } = require('./User.model');
const { Category } = require('./Category');

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    tableName: 'expenses',
    timestamps: false,
  },
);

Expense.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Expense, { foreignKey: 'categoryId' });

module.exports = {
  Expense,
};
