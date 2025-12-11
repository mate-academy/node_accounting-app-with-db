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
      allawNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allawNull: false,
      unique: true,
    },
  },
  {
    tableName: 'categories',
    timestamps: true,
  },
);

module.exports = {
  Category,
};
