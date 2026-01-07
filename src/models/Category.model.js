'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Category = sequelize.define(
  'Category',
  {
    name: {
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
