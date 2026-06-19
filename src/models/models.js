'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const User = require('./User.model')(sequelize, DataTypes);
const Expense = require('./Expense.model')(sequelize, DataTypes);

// Створення зв'язків
User.hasMany(Expense, { foreignKey: 'userId', onDelete: 'CASCADE' });
Expense.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  models: {
    User,
    Expense,
  },
};
