'use strict';

const { Sequelize } = require('sequelize');
const { sequelize } = require('../db.js');

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    spentAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    amount: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
    },
    note: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = {
  Expense,
};
