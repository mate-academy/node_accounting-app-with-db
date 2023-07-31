'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db', 'user', 'pass', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

const User = sequelize.define('User', {
  name: Sequelize.STRING,
}, {
  updatedAt: false,
  createdAt: false,
});

const Expense = sequelize.define('Expense', {
  userId: Sequelize.INTEGER,
  title: Sequelize.STRING,
  amount: Sequelize.INTEGER,
  category: Sequelize.STRING,
  note: Sequelize.STRING,
}, {
  updatedAt: false,
  createdAt: 'spentAt',
});

module.exports = {
  sequelize,
  User,
  Expense,
};
