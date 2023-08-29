'use strict';

const { DataTypes, UUIDV4 } = require('sequelize');
const { sequelize } = require('../sequelize/db');
const User = require('./user');

const Expense = sequelize.define('Expense',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    spentAt: {
      type: DataTypes.STRING,
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

    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'expenses',
    updatedAt: false,
    createdAt: false,
  }
);

Expense.belongsTo(User, { foreignKey: 'userId' });

module.exports = Expense;
