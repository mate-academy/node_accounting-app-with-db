'use strict';

const { sequelize } = require('../database/db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
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
