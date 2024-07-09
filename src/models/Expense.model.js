'use strict';

const { DataTypes } = require('sequelize');

const { sequelize } = require('../db.js');
const { User } = require('./User.model.js');

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    note: DataTypes.STRING,
  },
  {
    tableName: 'expense',
    timestamps: true,
    createdAt: 'spentAt',
    updatedAt: true,
  },
);

module.exports = {
  Expense,
};
