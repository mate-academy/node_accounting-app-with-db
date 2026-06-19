const { sequelize, DataTypes } = require('../db');

const Categories = sequelize.define(
  'Category',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    category: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    tableName: 'categories',
    createdAt: false,
    updatedAt: false,
  },
);

module.exports = {
  Categories,
};
