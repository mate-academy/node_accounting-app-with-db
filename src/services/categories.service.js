const { Category } = require('../models/Category.model');

async function getAll() {
  return Category.findAll();
}

async function getById(id) {
  return Category.findByPk(id);
}

function normalize({ id, name }) {
  return { id, name };
}

async function create(name) {
  return Category.create({ name });
}

async function deleteById(id) {
  return Category.destroy({
    where: { id },
  });
}

async function update({ id, name }) {
  await Category.update({ name }, { where: { id } });

  return getById(id);
}

const categoriesService = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  normalize,
};

module.exports = {
  categoriesService,
};
