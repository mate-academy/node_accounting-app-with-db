'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Categories = sequelize.define(
  'Categories',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
  Categories,
};
