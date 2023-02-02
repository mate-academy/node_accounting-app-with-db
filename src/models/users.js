'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db').sequelize;

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'users',
    updatedAt: false,
  }
);

module.exports = { User };
