'use strict';

const { DataTypes, UUIDV4 } = require('sequelize');
const { sequelize } = require('../sequelize/db');

const Category = sequelize.define('Category',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'categories',
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Category;
