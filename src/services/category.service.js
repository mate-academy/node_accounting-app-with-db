'use strict';

const { Op } = require('sequelize');
const {
  models: { Category },
} = require('../models/models');
const AppError = require('../errors/AppError');

const getAllCategories = () => Category.findAll();

const getCategoryById = async (id) => {
  const category = await Category.findByPk(id);

  if (!category) {
    throw new AppError(404, 'Category not found');
  }

  return category;
};

const createCategory = async (name) => {
  if (!name) {
    throw new AppError(400, 'Name is required');
  }

  if (name.length > 100) {
    throw new AppError(400, 'Name is too long (max 100 chars)');
  }

  const exists = await Category.findOne({ where: { name } });

  if (exists) {
    throw new AppError(409, 'Category already exists');
  }

  return Category.create({ name });
};

const updateCategory = async (id, name) => {
  const category = await getCategoryById(id);

  if (!name) {
    throw new AppError(400, 'Name is required');
  }

  if (name.length > 100) {
    throw new AppError(400, 'Name is too long (max 100 chars)');
  }

  const conflict = await Category.findOne({
    where: { name, id: { [Op.ne]: id } },
  });

  if (conflict) {
    throw new AppError(409, 'Another category with this name already exists');
  }

  category.name = name;
  await category.save();

  return category;
};

const deleteCategory = async (id) => {
  const category = await getCategoryById(id);

  await category.destroy();
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
