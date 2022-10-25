'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('./dbInit');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  createdAt: false,
  updatedAt: false,
});

module.exports = { User };
