'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const User = require('./User.model');

const Expense = sequelize.define(
  'Expense',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    category: { type: DataTypes.STRING },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
  {
    tableName: 'expenses',
    timestamps: true,
    underscored: true,
  },
);

Expense.belongsTo(User, { foreignKey: 'userId' });

module.exports = Expense;
