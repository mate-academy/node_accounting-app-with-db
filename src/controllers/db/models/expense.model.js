'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

// id: 123,
// userId: 1,
// spentAt: '2022-10-19T11:01:43.462Z',
// title: 'Buy a new laptop',
// amount: 999,
// category: 'Electronics',
// note: 'I need a new laptop',

const Expense = sequelize.define('Expense', {
  // Model attributes are defined here
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    require: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },

  category: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },

  note: {
    type: DataTypes.STRING,
    allowNull: false,
    require: false,
    defaultValue: '',
  },

  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    require: true,
  },

  spentAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
  },

  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'expenses',
});

module.exports = {
  Expense,
};
