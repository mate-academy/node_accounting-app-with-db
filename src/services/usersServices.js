/* eslint-disable no-console */
const { User } = require('../models/User.model');

const getUsers = async () => {
  try {
    const user = await User.findAll();

    return user;
  } catch (error) {
    throw error;
  }
};

const getOneUser = async (id) => {
  try {
    const selectedUser = await User.findByPk(id);

    return selectedUser;
  } catch (error) {
    throw error;
  }
};

const createUser = async (name) => {
  try {
    const newUser = await User.create(
      {
        name,
      },
      { returning: true },
    );

    return newUser;
  } catch (error) {
    throw error;
  }
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

const updateUser = ({ id, name }) => {
  const [updatedcount, updatedRows] = User.update(
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

module.exports = {
  createUser,
  getOneUser,
  getUsers,
  removeUser,
  updateUser,
};
