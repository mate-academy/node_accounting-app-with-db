const { models } = require('../models/models');
const { User } = models;

function getAll() {
  return User.findAll();
}

function getById(id) {
  return User.findByPk(id);
}

function create(name) {
  return User.create({ name });
}

function deleteById(id) {
  return User.destroy({
    where: { id },
  });
}

function update({ id, name }) {
  return User.update({ name }, { where: { id } });
}

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
};
