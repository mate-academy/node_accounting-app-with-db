const { models } = require('../models/models');
const { User } = models;

async function getAll() {
  return User.findAll();
}

async function getById(id) {
  return User.findByPk(id);
}

async function create(name) {
  if (!name || typeof name !== 'string') {
    const error = new Error('Name is required and must be a string');

    error.code = 400;
    throw error;
  }

  const newUser = await User.create({ name });

  return newUser;
}

async function remove(id) {
  const deletedRows = await User.destroy({
    where: { id },
  });

  return deletedRows > 0;
}

async function update(id, name) {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  if (!name || typeof name !== 'string') {
    const error = new Error('Name must be a string');

    error.code = 400;
    throw error;
  }

  await user.update({ name });

  return user;
}

async function reset() {
  await User.destroy({ truncate: true, where: {} });
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  reset,
};
