'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');
const { User } = require('./User.model');

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    spentAt: {
      type: DataTypes.DATE,
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
    },
    note: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

User.hasMany(Expense, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
Expense.belongsTo(User, {
  foreignKey: 'userId',
});

module.exports = {
  Expense,
};
