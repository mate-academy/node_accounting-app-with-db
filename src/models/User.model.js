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
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    timestamps: true, // Enable createdAt and updatedAt fields automatically
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

module.exports = {
  User,
};
