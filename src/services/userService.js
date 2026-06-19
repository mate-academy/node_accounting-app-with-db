const { User } = require('../models/User.model');

const getAll = async () => {
  const result = await User.findAll();

  return result;
};

const getById = async (id) => {
  const result = await User.findByPk(id);

  return result;
};

const create = async (name) => {
  const user = await User.create({ name });

  return user;
};

const deleteById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }
  await user.destroy();

  return user;
};

const update = async ({ id, name }) => {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  user.name = name;
  await user.save();

  return user;
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
};
