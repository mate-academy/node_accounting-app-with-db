const { models, normalizeUsers } = require('../models/models');
const { User } = models;

const reset = async () => {
  await User.destroy({ where: {} });
};

const getAll = async () => {
  const users = await User.findAll();

  return normalizeUsers(users);
};

const getOne = async (id) => {
  const user = await User.findOne({ where: { id } });

  return normalizeUsers([user]);
};

const create = async (name) => {
  const newUser = await User.create({ name });

  return normalizeUsers([newUser]);
};

const update = async (id, newName) => {
  await User.update({ name: newName }, { where: { id } });

  const updatedUser = await getOne(id);

  return updatedUser;
};

const remove = async (id) => {
  const deletedCount = await User.destroy({ where: { id } });

  return deletedCount > 0;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  reset,
};
