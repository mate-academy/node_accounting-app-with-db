'use strict';

const { Category } = require('../models/categories');
const { normalizeCategories } = require('../helpers');

async function getAll() {
  const categories = Category.findAll({
    order: ['name'],
  });

  return categories.map(normalizeCategories);
}

async function getById(id) {
  const category = await Category.findByPk(id);

  return normalizeCategories(category);
}

async function create(category) {
  const newCategory = await Category.create(category);

  return normalizeCategories(newCategory);
}

async function removeById(id) {
  await Category.destroy({
    where: {
      id,
    },
  });
}

async function updateById(categoryId, partsToUpdate) {
  const updatedUser = await Category.update({ ...partsToUpdate }, {
    where: {
      id: categoryId,
    },
  });

  return normalizeCategories(updatedUser);
}

module.exports = {
  categoriesService: {
    getAll,
    getById,
    create,
    removeById,
    updateById,
  },
};
