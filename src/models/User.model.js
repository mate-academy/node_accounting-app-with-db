'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
  },
);

module.exports = {
  User,
};
