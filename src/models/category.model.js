'use strict';

const { sequelize } = require('../db.js');
const { DataTypes } = require('sequelize');

const Category = sequelize.define(
  'category',
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
    createdAt: false,
    updatedAt: false,
  },
);
// eslint-disable-next-line
const getCategories = async () => await Category.findAll();
// eslint-disable-next-line
const getCategoryById = async (id) => await Category.findByPk(+id);

const createCategory = async (name) => {
  if (!name || typeof name !== 'string' || name.trim() !== '') {
    throw new Error('Name is not provided or invalid');
  }
  // eslint-disable-next-line
  return await Category.create({ name });
};

const deleteCategory = async (id) => {
  if (!id) {
    throw new Error('Category id is not provided');
  }

  await Category.destroy({
    where: { id },
  });
};

const updateCategory = async (id, name) => {
  // eslint-disable-next-line
  return await Category.update(
    { name },
    {
      where: { id: Number(id) },
      returning: true,
    },
  );
};

module.exports = {
  Category,
  getCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
};
