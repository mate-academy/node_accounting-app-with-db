const { User } = require('../models/User.model');

const getAll = async () => {
  const users = await User.findAll();

  return users;
};

const getByUserId = async (id) => {
  return User.findByPk(id);
};

const createUser = async (name) => {
  return User.create({ name });
};

const updateUser = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });

  return User.findByPk(id);
};

const deleteUser = async (id) => {
  await User.destroy({
    where: { id },
  });
};

module.exports = {
  getAll,
  getByUserId,
  createUser,
  updateUser,
  deleteUser,
};
