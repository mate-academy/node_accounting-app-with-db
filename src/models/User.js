'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'users',
  updatedAt: false,
  createdAt: false,
});

module.exports = {
  User,
};
