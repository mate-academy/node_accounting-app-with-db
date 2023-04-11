'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const User = sequelize.define(
  'User',
  {
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

module.exports = User;
