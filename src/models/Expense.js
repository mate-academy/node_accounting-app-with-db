'use strict';

const { sequelize } = require('../utils/db');
const { DataTypes } = require('sequelize');
const { User } = require('./User');

const Expense = sequelize.define('Expense', {
  spentAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
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
  updatedAt: false,
  createdAt: false,
});

Expense.belongsTo(User, { foreignKey: 'userId' });

module.exports = { Expense };
