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
      allowNull: false,
    },
  },
  {
    tableName: 'categories',
    timestamps: false,
    updatedAt: false,
    createdAt: false,
  },
);

const originalDestroy = Category.destroy;

Category.destroy = function (options) {
  if (options && options.truncate) {
    options.cascade = true;
    options.restartIdentity = true;
  }

  return originalDestroy.call(this, options);
};

module.exports = {
  Category,
};
