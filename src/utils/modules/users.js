'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Users = sequelize.define('users', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  updatedAt: false,
  createdAt: false,
});

module.exports = { Users };
