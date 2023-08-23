'use strict';

const { Sequelize } = require('sequelize');
const { sequelize } = require('../services/db');

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
  Expense,
};
