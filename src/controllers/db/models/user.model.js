'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const User = sequelize.define('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    require: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    // allowNull: false,
    // defaultValue: new Date(),
    // require: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    // allowNull: false,
    // defaultValue: new Date(),
    // require: true,
  },
}, {
  tableName: 'users',
});

module.exports = {
  User,
};
