/* eslint-disable */
const { Category } = require('../models/Category.model.js');

async function getAll() {
  const result = await Category.findAll();

  return result;
}

async function getById(id) {
  return Category.findByPk(id);
}

function create({ name, type }) {
  return Category.create({ name, type });
}

async function update({ id, name, type }) {
  await Category.update({ name, type }, { where: { id } });
  return Category.findByPk(id);
}

async function remove(id) {
  await Category.destroy({
    where: {
      id,
    },
  });
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
