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
  return User.destroy({ where: { id } });
}

async function update(id, name) {
  await User.update(
    { name: name },
    {
      where: { id },
      silent: true, // Save without updating the updatedAt timestamp
    },
  );

  return User.findByPk(id);
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
