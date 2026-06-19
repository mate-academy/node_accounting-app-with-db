'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Category = sequelize.define(
  'Category',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
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
