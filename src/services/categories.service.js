'use strict';

const { Category } = require('../models/Category.model');

function createCategoriesService() {
  function getAll() {
    return Category.findAll();
  }

  function getById(id) {
    return Category.findByPk(id);
  }

  function create(name) {
    return Category.create({ name });
  }

  function deleteById(id) {
    return Category.destroy({ where: { id } });
  }

  async function update(id, name) {
    await Category.update({ name }, { where: { id } });

    return Category.findByPk(id);
  }

  return {
    getAll,
    getById,
    create,
    deleteById,
    update,
  };
}

module.exports = {
  createCategoriesService,
};
