'use strict';

const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');
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
    tableName: 'category',
    timestamps: false,
  },
);

module.exports = {
  Category,
};
