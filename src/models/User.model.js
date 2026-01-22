'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'users',
    updatedAt: false,
    createdAt: false,
  },
);

const originalDestroy = User.destroy;

User.destroy = function (options) {
  if (options && options.truncate) {
    options.cascade = true;
    options.restartIdentity = true;
  }

  return originalDestroy.call(this, options);
};
// ----------------------------------------------

module.exports = {
  User,
};
