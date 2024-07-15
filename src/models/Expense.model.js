'use strict';

const { DataTypes } = require('sequelize');

const { sequelize } = require('../db.js');
const { User } = require('./User.model');

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      references: {
        model: User,
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spentAt: {
      type: DataTypes.DATE,
      field: 'spent_at',
      allowNull: false,
    },
    category: DataTypes.STRING,
    note: DataTypes.STRING,
  },
  {
    tableName: 'expenses',
    createdAt: false,
    updatedAt: false,
  },
);

User.hasMany(Expense, { foreignKey: 'userId' });

Expense.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  Expense,
};
