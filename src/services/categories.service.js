const { Category } = require('../models/Category.model');

async function getAll() {
  return Category.findAll();
}

async function getById(id) {
  return Category.findByPk(id);
}

async function getByName(name) {
  return Category.findOne({
    where: { name },
  });
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
  return Category.update({ name }, { where: { id } });
}

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  deleteById,
  update,
};
