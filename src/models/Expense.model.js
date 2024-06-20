'use strict';

const { sequelize } = require('../db.js');
const { DataTypes } = require('sequelize');
const { User } = require('./User.model.js');

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
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = {
  Expense,
};
