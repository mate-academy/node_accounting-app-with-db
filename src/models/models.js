'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');
const { sequelize } = require('../db');

User.hasMany(Expense, {
  foreignKey: 'id',
  onDelete: 'CASCADE',
});

Expense.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

module.exports = {
  sequelize,
  models: {
    User,
    Expense,
  },
};
