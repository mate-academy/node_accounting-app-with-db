'use strict';

const { sequelize } = require('../db.js');
const { DataTypes } = require('sequelize');

const Expense = sequelize.define(
  'Expense',
  {
    // Model attributes are defined here
    id: {
      // eslint-disable-next-line no-undef
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      // eslint-disable-next-line no-undef
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spentAt: {
      // eslint-disable-next-line no-undef
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    title: {
      // eslint-disable-next-line no-undef
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      // eslint-disable-next-line no-undef
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      // eslint-disable-next-line no-undef
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    note: {
      // eslint-disable-next-line no-undef
      type: DataTypes.STRING,
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
