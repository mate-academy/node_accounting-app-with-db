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
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  },
);

const originalDestroy = User.destroy.bind(User);

User.destroy = async function (options) {
  if (options && options.truncate) {
    options.cascade = true;
  }

  return originalDestroy(options);
};

module.exports = {
  User,
};
