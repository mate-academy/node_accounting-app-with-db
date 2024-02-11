'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // allowNull defaults to true
    defaultValue: 'UserDefaultName',
  },
  // createdAt: {
  //   type: DataTypes.DATE,
  //   field: 'created_at',
  //   allowNull: false, // allowNull defaults to true
  //   defaultValue: DataTypes.NOW,
  // },
}, {
  tableName: 'users',
  createdAt: false,
  updatedAt: false,
});

module.exports = {
  User,
};
