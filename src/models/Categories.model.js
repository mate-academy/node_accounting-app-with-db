const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Categories = sequelize.define(
  'Categories',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'categories',
    freezeTableName: true,
    updatedAt: false,
    createdAt: false,
  },
);

module.exports = {
  Categories,
};
