'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const User = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    createdAt: false,
    updatedAt: false,
  }
);

User.sync();

module.exports = {
  User,
};
