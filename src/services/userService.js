/* eslint-disable no-console */
const { User } = require('../models/User.model');

const resetUsers = async () => {
  try {
    await User.destroy({
      where: {},
      truncate: true,
    });

    console.log('All expenses have been reset.');
  } catch (error) {
    console.error('Error resetting user:', error);
  }
};

const getAllusers = async () => {
  const userAll = await User.findAll();

  return userAll;
};

const getUserById = async (id) => {
  const userById = await User.findByPk(id);

  return userById;
};

const createUser = async (name) => {
  try {
    const user = await User.create({
      name,
    });

    console.log('New expense create');

    return user;
  } catch (error) {
    console.error('Error creating user', error);
    throw error;
  }
};

const updateUser = async ({ id, name }) => {
  try {
    const [updateRowsCount] = await User.update({ name }, { where: { id } });

    if (updateRowsCount > 0) {
      const updateUserResult = await User.findByPk(id);

      return updateUserResult;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error updating user', error);
    throw error;
  }
};

const removeUser = async (id) => {
  const userDelete = await User.destroy({
    where: { id },
  });

  if (!userDelete) {
    console.error('Error');
  }

  return User.findByPk(id);
};

module.exports = {
  getAllusers,
  getUserById,
  updateUser,
  removeUser,
  createUser,
  resetUsers,
};
