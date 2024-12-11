const { User } = require('../models/User.model');

const getUsers = async () => {
  const users = await User.findAll({ order: ['name'] });

  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

const createUser = async (name) => {
  const user = await User.create({ name: name });

  return user;
};

const updateUser = async (id, name) => {
  await User.update({ name }, { where: { id } });

  const updatedUser = await getUserById(id);

  return updatedUser;
};

const removeUser = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  removeUser,
};
