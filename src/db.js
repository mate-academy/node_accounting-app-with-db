'use strict';

const { Sequelize, DataTypes } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize('postgres', 'postgres', process.env.PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.NUMBER,
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
    updatedAt: false,
    createdAt: false,
  }
);

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      allowNull: false,
    },
    spent_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
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

module.exports = {
  User,
  Expense,
  Sequelize,
};
