'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db.js');
const Expenses = require('./expenses.js');

const Users = sequelize.define('Users', {
  name: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
}, {
  tableName: 'users',
});

Users.hasMany(Expenses, {
  foreignKey: 'userId',
});

Expenses.belongsTo(Users, {
  foreignKey: 'userId',
});

module.exports = Users;
