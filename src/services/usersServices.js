/* eslint-disable no-console */
const { User } = require('../models/User.model');

const getUsers = () => {
  try {
    const user = User.findAll();

    return user;
  } catch (error) {
    throw error;
  }
};

const getOneUser = async (id) => {
  const selectedUser = await User.findByPk(id);

  return selectedUser;
};

const removeUser = async (id) => {
  try {
    const remove = await User.destroy({
      where: { id },
    });

    return remove > 0;
  } catch (error) {
    throw error;
  }
};

const updateUser = async ({ id, name }) => {
  const [updatedcount, updatedRows] = await User.update(
    { name },
    {
      where: { id },
      returning: true,
    },
  );

  if (updatedcount === 0) {
    return null;
  }

  return updatedRows[0];
};

const createUser = async (name) => {
  const newUser = await User.create(
    {
      name,
    },
    { returning: true },
  );

  return newUser;
};

module.exports = {
  createUser,
  getOneUser,
  getUsers,
  removeUser,
  updateUser,
};
