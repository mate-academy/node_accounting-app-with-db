const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Category = sequelize.define(
  'Category',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
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

module.exports = { Category };
