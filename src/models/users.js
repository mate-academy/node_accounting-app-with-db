'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'users',
  updatedAt: false,
});

module.exports = { User };
