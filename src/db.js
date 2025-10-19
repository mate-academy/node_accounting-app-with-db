'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const utils = require('util');

// Needed for testing purposes, do not remove
require('dotenv').config();
global.TextEncoder = utils.TextEncoder;

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

/*
  All credentials setted to default values (exsept password - it is exapmle)
  replace if needed with your own
*/

const sequelize = new Sequelize(
  POSTGRES_DB || 'postgres',
  POSTGRES_USER || 'postgres',
  POSTGRES_PASSWORD || '123123',
  {
    host: POSTGRES_HOST || 'localhost',
    port: POSTGRES_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  },
);

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
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
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
  },
});

User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync();

module.exports = {
  sequelize,
  users: User,
  expenses: Expense,
};
