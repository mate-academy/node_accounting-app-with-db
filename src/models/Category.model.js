'use strict';

const { sequelize } = require('../db.js');
const { DataTypes } = require('sequelize');

const Category = sequelize.define(
  'Category',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'categories',
    updatedAt: false,
    createdAt: false,
  },
);

module.exports = {
  Category,
};
