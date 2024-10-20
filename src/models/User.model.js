'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

sequelize.sync({ force: false });

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
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
