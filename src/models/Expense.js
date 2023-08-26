'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const Expense = sequelize.define('Expense', {
  spentAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'spent_at',
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
  tableName: 'expenses',
});

module.exports = {
  Expense,
};
