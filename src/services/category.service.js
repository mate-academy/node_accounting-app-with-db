const { Category } = require('../models/Category.model');

async function getAll() {
  return Category.findAll();
}

async function getSingle(id) {
  return Category.findByPk(id);
}

module.exports = {
  categoryService: {
    getAll,
    getSingle,
  },
};
