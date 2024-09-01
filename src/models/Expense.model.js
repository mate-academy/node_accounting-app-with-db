'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');
const { User } = require('./User.model.js');

const Expense = sequelize.define(
  'expense',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
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
      allowNull: true,
    },
  },
  {
    tableName: 'expenses',
    updatedAt: false,
    createdAt: false,
  },
);

User.hasMany(Expense, { foreignKey: { name: 'userId', allowNull: false } });
Expense.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false } });

module.exports = {
  Expense,
};
