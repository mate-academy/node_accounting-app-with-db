'use strict';

const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');
const seq = sequelize();

const User = seq.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  updatedAt: false,
  createdAt: false,
});

module.exports = { User };
