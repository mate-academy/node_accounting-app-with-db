'use strict';

const { sequelize } = require('../db.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.DataTypes.INTEGER,
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
    updatedAt: false,
    createdAt: false,
  },
);

module.exports = {
  User,
};
