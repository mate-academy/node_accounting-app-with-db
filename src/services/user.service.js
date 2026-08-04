const { User } = require('../models/models').models;

const getAll = async () => {
  return User.findAll();
};

const getById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error('Not found');
  }

  return user;
};

const create = async (name) => {
  const user = await User.create({ name });

  return user;
};

const update = async (id, data) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error('User not found');
  }

  await user.update(data);

  return user;
};

const remove = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error('Not found');
  }

  await user.destroy();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
