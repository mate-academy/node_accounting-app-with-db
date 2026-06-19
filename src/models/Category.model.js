'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Category = sequelize.define(
  'Category',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'categories',
    timestamps: false, // dacă nu folosești createdAt și updatedAt
  },
);

module.exports = {
  Category,
};
