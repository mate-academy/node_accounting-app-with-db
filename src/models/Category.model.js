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
    name: {
      type: DataTypes.STRING,
      primaryKey: false,
      defaultValue: 'other',
    },
  },
  {
    tableName: 'categories',
  },
);

module.exports = {
  Category,
};
