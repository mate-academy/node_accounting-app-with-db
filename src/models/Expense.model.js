'use strict';

const { DataTypes } = require('sequelize');

const { sequelize } = require('../db.js');

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
    },

    spentAt: {
      type: DataTypes.DATE,
    },

    title: {
      type: DataTypes.STRING,
    },

    amount: {
      type: DataTypes.INTEGER,
    },

    category: {
      type: DataTypes.STRING,
    },

    note: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'expenses',
    timestamps: true,
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    },
  },
);

module.exports = {
  Expense,
};
