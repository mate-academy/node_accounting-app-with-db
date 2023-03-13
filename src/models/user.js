'use strict';

const { sequelize } = require('../utils/database');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNul: false,
  },
}, {
  tableName: 'users',
  createdAt: false,
  updatedAt: false,
});

module.exports = {
  User,
};
