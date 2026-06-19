const { Category } = require('../models/Category.model');

async function getAll() {
  return Category.findAll();
}

async function getSingle(id) {
  return Category.findByPk(id);
}

async function create(name) {
  const categories = await Category.findAll();
  const id = categories.length + 1;

  return Category.create({ id, name });
}

async function remove(id) {
  await Category.destroy({ where: { id } });
}

async function update({ id, name }) {
  return Category.update({ name }, { where: { id } });
}

module.exports = {
  getAll,
  getSingle,
  create,
  remove,
  update,
};
