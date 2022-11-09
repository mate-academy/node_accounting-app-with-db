'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Categories = sequelize.define('categories', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'accounting-app-categories',
  updatedAt: false,
  createdAt: false,
});

const Users = sequelize.define('users', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'accounting-app-users',
  updatedAt: false,
});

const Expenses = sequelize.define('expenses', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
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
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'accounting-app-expenses',
  updatedAt: false,
});

module.exports = {
  Users,
  Expenses,
  Categories,
};
