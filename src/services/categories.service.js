const { Category } = require('../models/Category.model');

async function getAll() {
  return Category.findAll();
}

async function getById(id) {
  return Category.findByPk(id);
}

async function create(name) {
  return Category.create({ name });
}

async function deleteById(id) {
  return Category.destroy({ where: { id } });
}

async function update(id, name) {
  await Category.update(
    { name: name },
    {
      where: { id },
      silent: true, // Save without updating the updatedAt timestamp
    },
  );

  return Category.findByPk(id);
}

function normalize({ id, name, createdAt, updatedAt }) {
  return {
    id,
    name,
    createdAt,
    updatedAt,
  };
}

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  normalize,
};
