const { User } = require('../models/User.model.js');

const getAll = async () => {
  const users = await User.findAll();

  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

const create = async (name) => {
  const user = await User.create({ name });

  return user;
};

const update = async ({ id, name }) => {
  await User.update({ name }, { where: { id }, returning: true });

  return User.findByPk(id);
};

const remove = async (id) => {
  const deletedCount = await User.destroy({ where: { id } });

  return deletedCount;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
