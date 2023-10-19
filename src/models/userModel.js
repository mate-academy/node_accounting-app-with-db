'use strict';

const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'users',
});

module.exports = {
  User,
};
