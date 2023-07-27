'use strict';

const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');
const { User } = require('./users.model');

const Expense = sequelize.define('expense', {
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
  spentAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true,
  },

});

Expense.belongsTo(User, {
  foreignKey: 'userId',
});

module.exports = { Expense };
