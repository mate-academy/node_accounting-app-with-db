'use strict';

const { db } = require('../utils/db');
const { DataTypes } = require('sequelize');

const Expense = db.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spentAt: {
    type: DataTypes.DATE,
    field: 'spent_at',
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
  },
}, {
  tableName: 'expenses',
  createdAt: false,
  updatedAt: false,
});

module.exports = { Expense };
