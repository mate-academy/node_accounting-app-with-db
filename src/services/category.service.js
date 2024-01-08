'use strict';

const { Category } = require('../models/Category.js');

const normalize = ({ id, categoryName }) => {
  return {
    id,
    categoryName,
  };
};

const getAll = async() => {
  const result = await Category.findAll({
    order: ['createdAt'],
  });

  return result;
};

const create = (categoryName) => {
  return Category.create({ categoryName });
};

const getById = (id) => {
  return Category.findByPk(id);
};

const remove = async(id) => {
  await Category.destroy({
    where: {
      id,
    },
  });
};

const update = async({ id, categoryName }) => {
  await Category.update({ categoryName }, { where: { id } });

  const updatedCategory = {
    id,
    categoryName,
  };

  return updatedCategory;
};

const checkCategory = async(categoryName) => {
  const currCategory = await Category.findOne({ where: { categoryName } });

  if (!currCategory) {
    await Category.create({ categoryName });
  }
};

module.exports = {
  categoryService: {
    normalize,
    getAll,
    create,
    getById,
    remove,
    update,
    checkCategory,
  },
};
