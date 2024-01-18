'use strict';

require('dotenv').config();

const DB_PASSWORD = process.env.DB_PASSWORD;

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  spendAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'expenses',
  updatedAt: false,
  createdAt: false,
});

const User = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    createdAt: false,
    updatedAt: false,
  },
);

User.sync({ alter: true });
Expense.sync({ alter: true });

module.exports = {
  User,
  Expense,
};
