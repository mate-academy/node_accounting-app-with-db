'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');
const { Expense } = require('./Expense');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
});

User.hasOne(Expense, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});

module.exports = {
  User,
};
