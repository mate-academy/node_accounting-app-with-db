'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tableName: 'users',
  updatedAt: false,
});

module.exports = { User };
