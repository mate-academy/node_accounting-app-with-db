'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    createdAt: false,
    updatedAt: false,
    tableName: 'users',
  },
);

User.sync({ force: true });

module.exports = {
  User,
};
