const { User } = require('../models/User.model');

const getAllUsers = async () => {
  const users = await User.findAll();

  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne({
    where: {
      id: id,
    },
  });

  return user;
};

const createUser = async (name) => {
  const newUser = await User.create({ name });

  return newUser;
};

const updateUser = async (id, name) => {
  await User.update(
    { name },
    {
      where: {
        id,
      },
    },
  );

  const user = await User.findOne({ where: { id } });

  return user;
};

const deleteUser = async (id) => {
  const deleteCount = await User.destroy({ where: { id } });

  return deleteCount > 0;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
