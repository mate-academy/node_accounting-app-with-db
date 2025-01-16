'use strict';

const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },

  {
    tableName: 'users',
    createdAt: false,
    updatedAt: false,
  },
);

module.exports = {
  User,
};
