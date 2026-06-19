const { User } = require('../models/User.model');

async function getAll() {
  return User.findAll();
}

async function getById(id) {
  return User.findByPk(id);
}

function normalize({ id, name }) {
  return { id, name };
}

async function create(name) {
  return User.create({ name });
}

async function deleteById(id) {
  return User.destroy({
    where: { id },
  });
}

async function update({ id, name }) {
  await User.update({ name }, { where: { id } });

  return getById(id);
}

const usersService = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  normalize,
};

module.exports = {
  usersService,
};
