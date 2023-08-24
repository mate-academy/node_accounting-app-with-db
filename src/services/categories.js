'use strict';

const Category = require('../models/categories.js');

const getAll = async() => {
  const categories = await Category.findAll();

  return categories;
};

const getById = async(categoryId) => {
  const category = await Category.findByPk(categoryId);

  return category;
};

const create = async(name) => {
  const categoryToPush = await Category.create({ name });

  return categoryToPush;
};

const remove = async(categoryId) => {
  const categoryToRemove = await Category.destroy({
    where: { id: categoryId },
  });

  return categoryToRemove;
};

const update = async(categoryId, name) => {
  await Category.update({ name }, {
    where: { id: categoryId },
  });

  return getById(categoryId);
};

module.exports = {
  Category,
  getAll,
  getById,
  create,
  remove,
  update,
};
