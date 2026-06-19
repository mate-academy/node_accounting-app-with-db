'use strict';

const { sequelize } = require('../db.js');
const { DataTypes } = require('sequelize');

const Category = sequelize.define(
  // your code goes here
  'Category',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'categories',
    timestamps: false,
  },
);

module.exports = {
  Category,
};
