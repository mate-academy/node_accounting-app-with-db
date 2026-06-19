'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');
const { User } = require('../users/user.model.js');

const Expense = sequelize.define(
  'Expense',
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
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
      allowNull: true,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  { tableName: 'expenses', createdAt: false, updatedAt: false },
);

Expense.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Expense, { foreignKey: 'userId' });

module.exports = {
  Expense,
};
