'use strict';

const { sequelize } = require('../db.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
}, {
  tableName: 'users',
  createdAt: false,
  updatedAt: false,
});

module.exports = {
  User,
};
