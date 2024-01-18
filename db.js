'use strict';

require('dotenv').config();

const PASSWORD = process.env.DB_PASSWORD;

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});

const User = sequelize.define('users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  createdAt: false,
  updatedAt: false,
},
);

const Expense = sequelize.define('expenses', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
  },
  spentAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'expenses',
  createdAt: false,
  updatedAt: false,
},
);

User.sync();
Expense.sync();

module.exports = {
  User,
  Expense,
};
