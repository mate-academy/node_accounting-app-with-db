'use strict';

const { DataTypes, UUIDV4 } = require('sequelize');
const { sequelize } = require('../services/db');

const expenseModel = sequelize.define('expenseModel', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
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
  expenseModel,
};
