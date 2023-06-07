'use strict';

const { DataTypes } = require('sequelize');
const { dbInit } = require('../utils/db.js');

const db = dbInit();

const Expense = db.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  userId: {
    type: DataTypes.INTEGER,
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
}, {
  tablename: 'expenses',
  updatedAt: false,
  createdAt: false,
});

module.exports = { Expense };
