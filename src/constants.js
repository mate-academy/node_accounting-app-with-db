'use strict';

const PORT = 3000;

const BASE_URL = `http://localhost:${PORT}`;

const STATUS_CODE_OK = 200;

const STATUS_CODE_CREATED = 201;

const STATUS_CODE_NO_CONTENT = 204;

const STATUS_CODE_BAD_REQUEST = 400;

const STATUS_CODE_NOT_FOUND = 404;

const { sequelize } = require('./db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  createdAt: false,
  updatedAt: false,
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
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'expenses',
  createdAt: false,
  updatedAt: false,
});

module.exports = {
  PORT,
  BASE_URL,
  STATUS_CODE_OK,
  STATUS_CODE_CREATED,
  STATUS_CODE_NO_CONTENT,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_NOT_FOUND,
  User,
  Expense,
};
