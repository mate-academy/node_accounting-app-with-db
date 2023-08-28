'use strict';

const Category = require('../models/categories');

const getAll = async() => {
  const categories = await Category.findAll();

  return categories;
};

const getOne = async(categoryId) => {
  const category = await Category.findByPk(categoryId);

  return category;
};

const create = async(name) => {
  const newCategory = await Category.create({ name });

  return newCategory;
};

const deleteOne = async(categoryId) => {
  const categoryToDelete = await Category.destroy({
    where: { id: categoryId },
  });

  return categoryToDelete;
};

const updateOne = async(categoryId, name) => {
  const categoryToUpdate = await Category.update({ name }, {
    where: { id: categoryId },
  });

  return categoryToUpdate;
};

module.exports = {
  getAll, getOne, create, deleteOne, updateOne,
};
