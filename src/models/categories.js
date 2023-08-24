'use strict';

const { DataTypes, UUIDV4 } = require('sequelize');
const { sequelize } = require('../utils/db.js');

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
    updatedAt: false,
    createdAt: false,
  },
);

module.exports = Category;
