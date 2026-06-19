const { User } = require('../models/User.model');

const getAll = async () => {
  const users = await User.findAll();

  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

const create = async ({ name }) => {
  const user = await User.create({ name });

  return user;
};

const remove = async (id) => {
  const deleted = await User.destroy({ where: { id } });

  return deleted;
};

const update = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });

  const user = await getById(id);

  return user;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
