const { User } = require('../models/User.model');

async function getAll() {
  return User.findAll();
}

async function getById(id) {
  return User.findByPk(id);
}

async function create(name) {
  return User.create({ name });
}

async function deleteById(id) {
  return User.destroy({
    where: {
      id,
    },
  });
}

async function update({ id, name }) {
  return User.update({ name }, { where: { id } });
}

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
};
